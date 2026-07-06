import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { ForbiddenError, NotFoundError } from '../lib/errors';
import type { AuthenticatedRequest } from '../@types/express';
import { ROLES } from '../middlewares/rbac.middleware';

export default {
    // Requête pour récuperer toutes les opinions
    getAll: async (req: Request, res: Response) => {
        const opinions = await prisma.opinion.findMany();
        res.json(opinions);
    },
    // Requête pour récuperer une opinion pour un  utilisateur
    getByUser: async (req: Request, res: Response) => {
        const coursId = await parseIdFromParams(req.params.coursId);
        const userId = await parseIdFromParams(req.params.id);
        const opinion = await prisma.opinion.findFirst({
            where: { userId: userId, coursId: coursId },
        });
        if (!opinion) {
            return res.json({ IsOpinionExisting: false, opinion: { note: 0 } });
        }
        res.json({ IsOpinionExisting: true, opinion: opinion });
    },

    // Requête pour récuperer une opinion par son id
    getOneOpinion: async (req: Request, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        const opinion = await prisma.opinion.findUnique({ where: { id: opinionId } });
        if (!opinion) {
            throw new NotFoundError(`Opinion with id ${opinionId} not found`);
        }
        res.json(opinion);
    },

    // Requête pour créer une opinion
    createOpinion: async (req: AuthenticatedRequest, res: Response) => {
        const createOpinionBodySchema = z.object({
            content: z.string().min(1),
            note: z.number().min(0).max(5).int(),
            coursId: z.number(),
        });
        const data = await createOpinionBodySchema.parseAsync(req.body);
        const userId = req.user!.userId;

        const alreadyExistingOpinion = await prisma.opinion.findFirst({
            where: { coursId: data.coursId, userId },
        });
        if (alreadyExistingOpinion) {
            return res.status(204).end();
        }

        const enrollment = await prisma.coursStarted.findFirst({
            where: {
                    userId: req.user!.userId,
                    coursId: data.coursId,
                },
            },
        );
        if (!enrollment && req.user!.role !== ROLES.ADMIN) {
            throw new ForbiddenError('Vous devez être inscrit à ce cours pour laisser un avis');
        }

        const createdOpinion = await prisma.opinion.create({
            data: {
                content: data.content,
                note: data.note,
                coursId: data.coursId,
                userId,
            },
        });

        res.status(201).json(createdOpinion);
    },

    // Requête pour mettre à jour une opinion
    updateOpinion: async (req: AuthenticatedRequest, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        const updateOpinionBodySchema = z.object({
            content: z.string().min(1).optional(),
            note: z.number().min(0).max(5).int().optional(),
        });
        const data = await updateOpinionBodySchema.parseAsync(req.body);

        const opinion = await prisma.opinion.findUnique({ where: { id: opinionId } });
        if (!opinion) {
            throw new NotFoundError(`Opinion with id ${opinionId} not found`);
        }

        if (opinion.userId !== req.user!.userId) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à modifier cette opinion");
        }

        const updatedOpinion = await prisma.opinion.update({
            where: { id: opinionId },
            data: {
                content: data.content,
                note: data.note,
            },
        });
        res.json(updatedOpinion);
        return res.json(updatedOpinion);
    },

    // Requête pour supprimer une opinion
    deleteOpinion: async (req: AuthenticatedRequest, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        const opinion = await prisma.opinion.findUnique({ where: { id: opinionId } });
        if (!opinion) {
            throw new NotFoundError(`Opinion with id ${opinionId} not found`);
        }
        // Seul le propriétaire ou un admin peut supprimer (modération)
        if (opinion.userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à supprimer cette opinion");
        }
        await prisma.opinion.delete({ where: { id: opinionId } });
        res.status(204).send();
    },
};
