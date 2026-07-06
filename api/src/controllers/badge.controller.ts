import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import { ConflictError, NotFoundError } from '../lib/errors';

export default {
    // Requête pour récuperer tous les badges
    getAll: async (req: Request, res: Response) => {
        const badges = await prisma.badge.findMany({ orderBy: { id: 'asc' } });
        res.json(badges);
    },

    // Requête pour récuperer un badge par son id
    getOneBadge: async (req: Request, res: Response) => {
        const badgeId = await parseIdFromParams(req.params.id);
        const badge = await prisma.badge.findUnique({ where: { id: badgeId } });
        if (!badge) {
            throw new NotFoundError(`Badge with id ${badgeId} not found`);
        }
        res.json(badge);
    },
    getBadgesByUser: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const badgesByUser = await prisma.userHasBadge.findMany({
            where: { userId: userId },
            include: { badge: true },
            orderBy: { id: 'asc' },
        });
        if (!badgesByUser) {
            throw new NotFoundError(`Badges with id ${badgesByUser} not found`);
        }
        res.json(badgesByUser);
    },
    // Requête pour créer un badge
    createBadge: async (req: Request, res: Response) => {
        const createBadgeBodySchema = z.object({
            name: z.string().min(1),
            description: z.string(),
            icon: z.string(),
            color: z.string(),
        });
        const data = await createBadgeBodySchema.parseAsync(req.body);

        const alreadyExistingBadge = await prisma.badge.findFirst({ where: { name: data.name } });
        if (alreadyExistingBadge) {
            throw new ConflictError(`Badge name already taken : ${data.name}`);
        }

        const createdBadge = await prisma.badge.create({
            data: {
                name: data.name,
                description: data.description,
                icon: data.icon,
                color: data.color,
            },
        });
        res.status(201).json(createdBadge);
    },

    // Requête pour mettre à jour un badge
    updatingBadge: async (req: Request, res: Response) => {
        const badgeId = await parseIdFromParams(req.params.id);
        const updateBadgeBodySchema = z.object({
            name: z.string().min(1).optional(),
            description: z.string().optional(),
        });
        const { name, description } = await updateBadgeBodySchema.parseAsync(req.body);
        const badgeToUpdate = await prisma.badge.findUnique({ where: { id: badgeId } });
        if (!badgeToUpdate) {
            throw new NotFoundError(`Badge with id ${badgeId} not found`);
        }
        if (name) {
            const alreadyExistingBadge = await prisma.badge.findFirst({
                where: { name, id: { not: badgeId } },
            });
            if (alreadyExistingBadge) {
                throw new ConflictError(`Badge name already taken : ${name}`);
            }
        }
        const updatedBadge = await prisma.badge.update({
            where: { id: badgeId },
            data: {
                name,
                description,
            },
        });
        res.json(updatedBadge);
    },

    // Requête pour supprimer un badge
    deleteBadge: async (req: Request, res: Response) => {
        const badgeId = await parseIdFromParams(req.params.id);
        const badgeToDelete = await prisma.badge.findUnique({ where: { id: badgeId } });
        if (!badgeToDelete) {
            throw new NotFoundError(`Badge with id ${badgeId} not found`);
        }
        await prisma.badge.delete({ where: { id: badgeId } });
        res.status(204).send();
    },
};
