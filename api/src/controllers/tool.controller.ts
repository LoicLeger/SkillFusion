import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { NotFoundError } from '../lib/errors';

export default {
    // Requête pour récuperer tous les outils
    getAll: async (req: Request, res: Response) => {
        const tools = await prisma.tool.findMany();
        res.json(tools);
    },

    // Requête pour récuperer un outil par son id
    getOneTool: async (req: Request, res: Response) => {
        const toolId = await parseIdFromParams(req.params.id);
        const tool = await prisma.tool.findUnique({ where: { id: toolId } });
        if (!tool) {
            throw new NotFoundError(`Tool with id ${toolId} not found`);
        }
        res.json(tool);
    },

    // Requête pour créer un outil
    createTool: async (req: Request, res: Response) => {
        const createToolBodySchema = z.object({
            name: z.string().min(1),
            description: z.string().min(1).optional(),
        });
        const data = await createToolBodySchema.parseAsync(req.body);

        const createdTool = await prisma.tool.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        res.status(201).json(createdTool);
    },

    // Requête pour mettre à jour un outil
    updatingTool: async (req: Request, res: Response) => {
        const toolId = await parseIdFromParams(req.params.id);
        const updateToolBodySchema = z.object({
            name: z.string().min(1),
            description: z.string().min(1).optional(),
        });
        const { name, description } = await updateToolBodySchema.parseAsync(req.body);

        const updatedTool = await prisma.tool.update({
            where: { id: toolId },
            data: {
                name,
                description,
            },
        });
        res.json(updatedTool);
    },

    // Requête pour supprimer un outil
    deleteTool: async (req: Request, res: Response) => {
        const toolId = await parseIdFromParams(req.params.id);
        await prisma.tool.delete({
            where: { id: toolId },
        });
        res.status(204).end();
    },
};
