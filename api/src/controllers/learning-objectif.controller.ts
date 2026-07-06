import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { NotFoundError } from '../lib/errors';

export default {
    // Requête pour récuperer tous les objectifs d'apprentissage
    getAll: async (req: Request, res: Response) => {
        const learningObjectifs = await prisma.learningObjective.findMany();
        res.json(learningObjectifs);
    },

    // Requête pour récuperer un objectif d'apprentissage par son id
    getOneLearningObjectif: async (req: Request, res: Response) => {
        const learningObjectifId = await parseIdFromParams(req.params.id);
        const learningObjectif = await prisma.learningObjective.findUnique({
            where: { id: learningObjectifId },
        });
        if (!learningObjectif) {
            throw new NotFoundError(`Learning Objectif with id ${learningObjectifId} not found`);
        }
        res.json(learningObjectif);
    },

    // Requête pour créer un objectif d'apprentissage
    createLearningObjectif: async (req: Request, res: Response) => {
        const createLearningObjectifBodySchema = z.object({
            title: z.string().min(1),
            description: z.string().min(1).optional(),
        });
        const data = await createLearningObjectifBodySchema.parseAsync(req.body);

        const createdLearningObjectif = await prisma.learningObjective.create({
            data: {
                title: data.title,
                description: data.description,
            },
        });
        res.status(201).json(createdLearningObjectif);
    },

    // Requête pour mettre à jour un objectif d'apprentissage
    updatingLearningObjectif: async (req: Request, res: Response) => {
        const learningObjectifId = await parseIdFromParams(req.params.id);
        const updateLearningObjectifBodySchema = z.object({
            title: z.string().min(1),
            description: z.string().min(1).optional(),
        });
        const { title, description } = await updateLearningObjectifBodySchema.parseAsync(req.body);

        const updatedLearningObjectif = await prisma.learningObjective.update({
            where: { id: learningObjectifId },
            data: {
                title,
                description,
            },
        });
        res.json(updatedLearningObjectif);
    },

    // Requête pour supprimer un objectif d'apprentissage
    deleteLearningObjectif: async (req: Request, res: Response) => {
        const learningObjectifId = await parseIdFromParams(req.params.id);
        await prisma.learningObjective.delete({ where: { id: learningObjectifId } });
        res.status(204).send();
    },
};
