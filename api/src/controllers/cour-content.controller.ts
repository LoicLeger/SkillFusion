import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { ForbiddenError, NotFoundError } from '../lib/errors';
import type { AuthenticatedRequest } from '../@types/express';
import { ROLES } from '../middlewares/rbac.middleware';

export default {
    // GET public — sécurisé par le router
    getAll: async (req: Request, res: Response) => {
        const courContents = await prisma.coursContent.findMany();
        res.json(courContents);
    },

    // GET public
    getOneCourContent: async (req: Request, res: Response) => {
        const courContentId = await parseIdFromParams(req.params.id);
        const courContent = await prisma.coursContent.findUnique({ where: { id: courContentId } });
        if (!courContent) {
            throw new NotFoundError(`CourContent with id ${courContentId} not found`);
        }
        res.json(courContent);
    },

    // Requête pour créer un contenu de cours
    createCourContent: async (req: AuthenticatedRequest, res: Response) => {
        const createCourContentBodySchema = z.object({
            content: z.string().min(1),
            numberPage: z.number().min(1).int(),
            coursId: z.number().int(),
        });

        const data = await createCourContentBodySchema.parseAsync(req.body);

        // Vérification que le cours appartient à l'instructeur connecté
        const cours = await prisma.cours.findFirst({ where: { id: data.coursId } });
        // Cours non trouvé
        if (!cours) {
            throw new NotFoundError('Cours not found');
        }
        // Pas les droits pour modifier ce cours
        if (cours.authorId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à modifier ce cours");
        }

        const pageExisted = await prisma.coursContent.findFirst({
            where: { coursId: data.coursId, numberPage: data.numberPage },
        });
        if (pageExisted) {
            const allContentCours = await prisma.coursContent.findMany({
                where: { coursId: data.coursId },
            });

            await Promise.all(
                allContentCours
                    .filter((c) => c.numberPage >= data.numberPage) // on ne décale que les pages concernées
                    .map((c) =>
                        prisma.coursContent.update({
                            where: { id: c.id },
                            data: { numberPage: c.numberPage + 1 }, // on incrémente directement la valeur
                        })
                    )
            );
        }

        const createdCourContent = await prisma.coursContent.create({
            data: {
                content: data.content,
                numberPage: data.numberPage,
                coursId: data.coursId,
            },
        });

        // Mise à jour du nombre de pages du cours
        await prisma.cours.update({
            where: { id: cours.id },
            data: { numberPage: cours.numberPage + 1 },
        });

        res.status(201).json(createdCourContent);
    },

    // Requête pour mettre à jour un contenu de cours
    updatingCourContent: async (req: AuthenticatedRequest, res: Response) => {
        const courContentId = await parseIdFromParams(req.params.id);
        const updateCourContentBodySchema = z.object({
            content: z.string().min(1).optional(),
            numberPage: z.number().min(1).int().optional(),
            coursId: z.number().int().optional(),
        });
        const { content, numberPage, coursId } = await updateCourContentBodySchema.parseAsync(
            req.body
        );

        // Vérification que le contenu existe et que le cours appartient à l'instructeur connecté
        const courContent = await prisma.coursContent.findUnique({ where: { id: courContentId } });
        if (!courContent) {
            throw new NotFoundError(`CourContent with id ${courContentId} not found`);
        }

        const cours = await prisma.cours.findFirst({ where: { id: courContent.coursId } });
        if (cours && cours.authorId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à modifier ce contenu");
        }

        const updatedCourContent = await prisma.coursContent.update({
            where: { id: courContentId },
            data: { content, numberPage },
        });
        res.json(updatedCourContent);
    },
    // Requête pour supprimer un contenu de cours
    deleteCourContent: async (req: AuthenticatedRequest, res: Response) => {
        const courContentId = await parseIdFromParams(req.params.id);
        const coursToBeDeleted = await prisma.coursContent.findFirst({
            where: { id: courContentId },
        });

        // Cours à supprimer non trouvé
        if (!coursToBeDeleted) {
            throw new NotFoundError(`CourContent with id ${courContentId} not found`);
        }

        const coursPages = await prisma.cours.findFirst({
            where: { id: coursToBeDeleted.coursId },
        });
        if (!coursPages) {
            throw new NotFoundError('Cours not found');
        }

        // Vérification de l'appartenance du cours à l'instructeur connecté
        if (coursPages.authorId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à supprimer ce contenu");
        }

        if (coursPages.numberPage > 1) {
            await prisma.cours.update({
                where: { id: coursPages.id },
                data: { numberPage: coursPages.numberPage - 1 },
            });

            const coursDeleted = await prisma.coursContent.delete({ where: { id: courContentId } });

            const allContentCours = await prisma.coursContent.findMany({
                where: { coursId: coursPages.id },
            });

            // CORRIGÉ : Promise.all attend la fin de toutes les mises à jour avant de continuer
            await Promise.all(
                allContentCours
                    .filter((c) => c.numberPage >= coursDeleted.numberPage)
                    .map((c) =>
                        prisma.coursContent.update({
                            where: { id: c.id },
                            data: { numberPage: c.numberPage - 1 },
                        })
                    )
            );
        }

        res.status(204).send();
    },
};
