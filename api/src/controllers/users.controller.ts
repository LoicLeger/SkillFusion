import type { Request, Response } from "express";
import { prisma } from "../models/client"
import { AuthenticatedRequest } from "../@types/express";
import { NotFoundError, ConflictError, ForbiddenError } from "../lib/errors";
import z from "zod";
import { parseIdFromParams } from "./utils";
import argon2 from "argon2";
import { ROLES } from "../middlewares/rbac.middleware";


export default {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      omit: { password: true },
      include: { role: true }
    });
    res.json(users);
  },

  // Export des données de l'utilisateur connecté (RGPD) -----------------------------------------------

  exportMyData: async (req: AuthenticatedRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        role: { select: { name: true } },
        enrollments: { include: { cours: { select: { id: true, title: true } } } },
        activations: { include: { cours: { select: { id: true, title: true } } } },
        badges: { include: { badge: { select: { name: true, description: true } } } },
        commentaires: { include: { cours: { select: { id: true, title: true } } } },
        opinions: { include: { cours: { select: { id: true, title: true } } } },
        notifications: { include: { cours: { select: { id: true, title: true } } } },
        createdCours: { select: { id: true, title: true, createdAt: true } },
      },
    });
    if (!user) throw new NotFoundError("Utilisateur non trouvé");

    const exportData = {
      exportedAt: new Date().toISOString(),
      profil: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        urlProfilImage: user.urlProfilImage,
        role: user.role.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      coursInscrits: user.enrollments.map(e => ({
        id: e.cours.id,
        titre: e.cours.title,
        inscritLe: e.createdAt,
      })),
      progression: user.activations.map(a => ({
        id: a.cours.id,
        titre: a.cours.title,
        termine: a.IsEnd,
        depuis: a.createdAt,
      })),
      badges: user.badges.map(b => ({
        nom: b.badge.name,
        description: b.badge.description,
        obtenuLe: b.createdAt,
      })),
      commentaires: user.commentaires.map(c => ({
        cours: c.cours.title,
        contenu: c.description,
        publiéLe: c.createdAt,
      })),
      avis: user.opinions.map(o => ({
        cours: o.cours.title,
        contenu: o.content,
        note: o.note,
        publiéLe: o.createdAt,
      })),
      notifications: user.notifications.map(n => ({
        contenu: n.content,
        cours: n.cours.title,
        reçuLe: n.createdAt,
      })),
      coursCreés: user.createdCours.map(c => ({
        id: c.id,
        titre: c.title,
        créeLe: c.createdAt,
      })),
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="mes-donnees-skillfusion-${user.id}.json"`
    );
    res.status(200).json(exportData);
  },

  // Suppression du compte de l'utilisateur connecté (RGPD) --------------------------------------------

  deleteMyAccount: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const coursCreés = await prisma.cours.findMany({
      where: { authorId: userId },
      select: { id: true, title: true }
    });

    if (coursCreés.length > 0) {
      res.status(409).json({
        code: "HAS_CREATED_COURSES",
        message: "Vous avez des cours créés. Veuillez les transférer ou les supprimer avant de continuer.",
        cours: coursCreés
      });
      return;
    }

    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  },

  // Récupérer un utilisateur par son id
  getUserById: async (req: AuthenticatedRequest, res: Response) => {
    const userId = await parseIdFromParams(req.params.id);

    // Seul l'utilisateur lui-même ou un admin peut voir ce profil
    if (userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
      throw new ForbiddenError("Vous n'êtes pas autorisé à accéder à ce profil");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: {
        role: true
      }
    });

    // Si pas trouvé → 404 sinon 200 + user
    if (!user) {
      throw new NotFoundError(`Utilisateur avec l'id ${userId} non trouvé`);
    }
    res.status(200).json(user);
  },

  // Créer un nouvel utilisateur
  createUser: async (req: Request, res: Response) => {
    const createUserBodySchema = z.object({
      pseudo: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      firstname: z.string().min(1),
      lastname: z.string().min(1),
      urlProfilImage: z.string().optional(),
      roleId: z.number().optional(),
    });
    const data = await createUserBodySchema.parseAsync(req.body);

    if (data.roleId) {
      const roleExists = await prisma.role.findUnique({
        where: { id: data.roleId }
      });

      if (!roleExists) {
        return res.status(400).json({ error: `Le rôle avec l'ID ${data.roleId} n'existe pas.` });
      }
    }

    // Vérification email unique
    const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingEmail) throw new ConflictError("Email déjà utilisé");

    // AJOUTÉ : vérification pseudo unique 
    const existingPseudo = await prisma.user.findUnique({ where: { pseudo: data.pseudo } });
    if (existingPseudo) throw new ConflictError("Pseudo déjà utilisé");

    // Pour le hashage du mot de passe
    const hashedPassword = await argon2.hash(data.password);

    const createdUser = await prisma.user.create({
      data: {
        pseudo: data.pseudo,
        email: data.email,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        urlProfilImage: data.urlProfilImage,
        roleId: data.roleId,
      }
    });
    res.status(201).json(createdUser);
  },

  // Mettre à jour un utilisateur
  updateUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = await parseIdFromParams(req.params.id);

    // Seul l'utilisateur lui-même ou un admin peut modifier ce profil
    if (userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
      throw new ForbiddenError("Vous n'êtes pas autorisé à modifier ce profil");
    }
    // Schéma de validation des données
    const updateUserBodySchema = z.object({
      pseudo: z.string().min(1).optional(),
      email: z.string().optional(),
      password: z.string().min(6).optional(),
      firstname: z.string().min(1).optional(),
      lastname: z.string().min(1).optional(),
      urlProfilImage: z.string().optional(),
      roleId: z.number().optional(),
    });

    const data = await updateUserBodySchema.parseAsync(req.body);

    if (data.email) {
      // Ne pas vérifier si l'email appartient déjà à l'utilisateur en cours
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      // Si l'email existe et ce n'est pas celui de l'utilisateur actuel, alors renvoyer une erreur
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictError("Email déjà utilisé");
      }
    }

    // Si password fourni → on hash, sinon undefined
    const hashedPassword = data.password ? await argon2.hash(data.password) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        pseudo: data.pseudo,
        email: data.email,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        urlProfilImage: data.urlProfilImage,
        roleId: data.roleId,
      }
    });

    res.status(200).json(updatedUser);
  },

  // Supprimer un utilisateur
  deleteUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = await parseIdFromParams(req.params.id);

        // Seul l'utilisateur lui-même ou un admin peut supprimer ce profil
    if (userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
      throw new ForbiddenError("Vous n'êtes pas autorisé à supprimer ce profil");
    }

    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  }
}