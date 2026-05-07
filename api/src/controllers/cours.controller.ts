import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { ConflictError, ForbiddenError, NotFoundError } from '../lib/errors';
import type { AuthenticatedRequest } from '../@types/express';
import { ROLES } from '../middlewares/rbac.middleware';

export default {
    getAll: async (req: Request, res: Response) => {
        let data = null;
        if (req.query.slug) {
            const cours = await prisma.cours.findMany({
                where: { slug: { contains: req.query.slug as string } },
                include: {
                    category: true,
                    comments: {
                        include: {
                            author: true,
                        },
                    },
                    author: {
                        omit: { password: true },
                    },
                    learningObjectives: {
                        include: { objectif: true },
                    },
                    content: true,
                    tools: {
                        include: { tools: true },
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true },
                            },
                        },
                    },
                },
            });
            data = cours[0];
        } else if (req.query.visibility) {
            const cours = await prisma.cours.findMany({
                where: { visibility: true },
                include: {
                    category: true,
                    author: {
                        omit: { password: true },
                    },
                    learningObjectives: {
                        include: { objectif: true },
                    },
                    content: true,
                    tools: {
                        include: { tools: true },
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true },
                            },
                        },
                    },
                },
            });
            data = cours;
        } else {
            const cours = await prisma.cours.findMany({
                include: {
                    category: true,
                    author: {
                        omit: { password: true },
                    },
                    learningObjectives: {
                        include: { objectif: true },
                    },
                    tools: {
                        include: { tools: true },
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true },
                            },
                        },
                    },
                },
            });
            data = cours;
        }
        res.json(data);
    },
    // Requête pour récuperer les cours d'un utilisateur (instructeur) ---------------
    getCoursByInstructor: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findMany({
            where: { authorId: userId },
            include: { category: true, author: true },
        });

        res.json(cours);
    },
    // Requête pour récuperer les cours récents
    getForHomePage: async (req: Request, res: Response) => {
        const cours = await prisma.cours.findMany({
            where: { visibility: true },
            include: { category: true },
            orderBy: { createdAt: 'desc' },
            take: 4,
        });
        res.json(cours);
    },
    // Requête pour créer un cours
    createCours: async (req: AuthenticatedRequest, res: Response) => {
        req.body.slug = req.body.title.replaceAll(' ', '-');
        req.body.authorId = req.user!.userId;
        const createCoursBodySchema = z.object({
            title: z.string().min(1),
            littleSummary: z.string().optional(),
            urlImage: z.string().optional(),
            difficulty: z.number().int().min(0).max(4),
            summary: z.string().optional(),
            authorId: z.number().int(),
            categoryId: z.number().int(),
            slug: z.string().min(1),
        });
        const data = await createCoursBodySchema.parseAsync(req.body);

        const alreadyExistingCours = await prisma.cours.findFirst({ where: { title: data.title } });
        if (alreadyExistingCours) {
            throw new ConflictError(`Title name already taken : ${data.title}`);
        }

        const createdCours = await prisma.cours.create({
            data: {
                title: data.title,
                slug: data.slug,
                numberPage: 1,
                littleSummary: data.littleSummary,
                difficulty: data.difficulty,
                summary: data.summary,
                visibility: false,
                authorId: data.authorId,
                categoryId: data.categoryId,
            },
        });

        const courContent = await prisma.coursContent.create({
            data: {
                coursId: createdCours.id,
                content: '# Page 1 \n\nEntrez votre contenu',
                numberPage: 1,
            },
        });
        res.status(201).json(createdCours);
    },
    //Recuperer un cours par son id
    getOneCours: async (req: Request, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) {
            throw new NotFoundError('Cours not found');
        }
        res.json(cours);
    },
    //Suprimer un cours par son id
    deleteCours: async (req: AuthenticatedRequest, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) {
            throw new NotFoundError('Cours not found');
        }

        // Bypass admin ajouté
        if (req.user?.userId !== cours.authorId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à supprimer ce cours");
        }

        await prisma.cours.delete({ where: { id: coursId } });

        res.status(204).end();
    },
    // Requête pour modifier un cours
    updatingCours: async (req: AuthenticatedRequest, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const updateCoursBodyScheme = z.object({
            title: z.string().min(1),
            slug: z.string().min(1),
            littleSummary: z.string().optional(),
            urlImage: z.string().optional(),
            difficulty: z.number().int().min(0).max(4),
            summary: z.string().optional(),
            visibility: z.boolean(),
            numberPage: z.number().int(),
            authorId: z.number().int(),
            categoryId: z.number().int(),
            tools: z.array(z.number().int()),
            learningObjectives: z.array(z.number().int()),
            content: z.array(z.number().int()),
            enrollments: z.array(z.number().int()),
            activations: z.array(z.number().int()),
            comments: z.array(z.number().int()),
            opinions: z.array(z.number().int()),
            notifications: z.array(z.number().int()),
        });
        const {
            title,
            slug,
            numberPage,
            littleSummary,
            urlImage,
            difficulty,
            summary,
            visibility,
            categoryId,
        } = await updateCoursBodyScheme.parseAsync(req.body);

        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) {
            throw new NotFoundError('Cours not found');
        }
        const alreadyExistingCours = await prisma.cours.findFirst({
            where: { title: title, id: { not: coursId } },
        });

        // Vérification de l'autorisation Admin :
        if (req.user?.userId !== cours.authorId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à modifier ce cours");
        }

        if (alreadyExistingCours) {
            throw new ConflictError(`Title name already taken : ${title}`);
        }

        const updatedCours = await prisma.cours.update({
            where: { id: coursId },
            data: {
                title,
                slug,
                numberPage,
                littleSummary,
                urlImage,
                difficulty,
                summary,
                visibility,
                authorId: req.user!.userId,
                categoryId,
                updatedAt: new Date(),
            },
        });
        res.json(updatedCours);
    },

    // En cas de suppression de compte :
    // si il y a des cours crées,
    // On propose de transferer la propriété à un admin
    transferMyCoursToAdmin: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.userId;

        const admin = await prisma.user.findFirst({ where: { roleId: 3 } });
        if (!admin) throw new NotFoundError('Administrateur introuvable');

        await prisma.cours.updateMany({
            where: { authorId: userId },
            data: { authorId: admin.id },
        });

        res.status(200).json({ message: "Cours transférés à l'administrateur." });
    },
    // On propose de supprimer tous les cours crées par l'utilisateur
    deleteAllMyCours: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.userId;

        await prisma.cours.deleteMany({ where: { authorId: userId } });

        res.status(204).end();
    },

    changeVisibility: async (req: AuthenticatedRequest, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findFirst({ where: { id: coursId } });
        if (!cours) {
            throw new NotFoundError('Cours not found');
        }
        // Seul l'auteur ou un admin peut changer la visibilité
        if (req.user?.userId !== cours.authorId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError(
                "Vous n'êtes pas autorisé à modifier la visibilité de ce cours"
            );
        }

        await prisma.cours.update({
            where: { id: coursId },
            data: { visibility: !cours.visibility },
        });
        return res.status(204).end();
    },
};
