import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ForbiddenError, NotFoundError } from "../lib/errors";
import { ROLES } from "../middlewares/rbac.middleware";
import { AuthenticatedRequest } from "../@types/express";

export default {
    // Requête pour récuperer tous les cours actives
    getAll: async (req: Request, res: Response) => {
        const coursActives = await prisma.coursActived.findMany();
        res.json(coursActives);

    },
    getEndedCoursByUser: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const coursByUser = await prisma.coursActived.findMany({
            where: { IsEnd: true, userId: userId, cours: {visibility: true }},
            include: {
                cours: { include: { category: true } },
            }
        })
        if (!coursByUser) {
            throw new NotFoundError(`Cours active with id ${coursByUser} not found`);
        }
        res.json(coursByUser);
    },
    // Requête pour récuperer tous les cours actives d'un étudiant
    getByUser: async (req: AuthenticatedRequest, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);

        // Vérification ! un étudiant ne voit que ses cours actifs
        if (userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Accès refusé");
        }

        const coursByUser = await prisma.coursActived.findMany({
            where: {IsEnd:false, userId: userId, cours: {visibility: true }},
            include: {
                cours: { include: { category: true } },
            }
        })
        res.json(coursByUser);
    },

    // Requête pour récuperer un cours active par son id
    getOneCoursActive: async (req: AuthenticatedRequest, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);

        const coursActive = await prisma.coursActived.findUnique({ where: { id: coursActiveId } });
        if (!coursActive) {
            throw new NotFoundError(`Cours active with id ${coursActiveId} not found`);
        }

        // ✅ manquant !
        if (coursActive.userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Accès refusé");
        }

        res.json(coursActive);
    },

    // Requête pour créer un cours active
    createCoursActive: async (req: AuthenticatedRequest, res: Response) => {
        const createCoursActiveBodySchema = z.object({
            coursId: z.number(),

        });
        const data = await createCoursActiveBodySchema.parseAsync(req.body);
        const userId = req.user!.userId;

        const alreadyExistingCours = await prisma.coursActived.findFirst({ where: { coursId: data.coursId, userId } });

        if (alreadyExistingCours) {
            return res.status(204).end()
        }

        const createdCoursActive = await prisma.coursActived.create({
            data: {
                coursId: data.coursId,
                userId,
                IsEnd: false
            }
        });
        res.status(201).json(createdCoursActive);
    },

    // Requête pour mettre à jour un cours active
    updatingCoursActive: async (req: AuthenticatedRequest, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);

        // Récupération dans la bdd avant update pour pouvoir vérifier la propriété
        const coursActive = await prisma.coursActived.findUnique({ where: { id: coursActiveId } });
        if (!coursActive) {
            throw new NotFoundError(`Cours active with id ${coursActiveId} not found`);
        }

        // Vérification du role/de la propriété
        if (coursActive.userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Accès refusé");
        }

        const updateCoursActiveBodySchema = z.object({
            coursId: z.number().int(),
            userId: z.number().int(),
            IsEnd: z.boolean(),
        });
        const data = await updateCoursActiveBodySchema.parseAsync(req.body);

        const dataCoursActive = await prisma.coursActived.findMany({
             where: { coursId: data.coursId, userId: data.userId  },
        })
        const updatedCoursActive = await prisma.coursActived.update({
            where: { id: dataCoursActive[0].id },
            data: { IsEnd: data.IsEnd }
        });
        res.json(updatedCoursActive);
    },


    // Requête pour supprimer un cours active
    deleteCoursActive: async (req: AuthenticatedRequest, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);

        // Récupération avant delete pour vérifier la propriété
        const coursActive = await prisma.coursActived.findUnique({ where: { id: coursActiveId } });
        if (!coursActive) {
            throw new NotFoundError(`Cours active with id ${coursActiveId} not found`);
        }

        // Vérification de la propriété
        if (coursActive.userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Accès refusé");
        }

        await prisma.coursActived.delete({ where: { id: coursActiveId } });
        res.status(204).send();


    },

}