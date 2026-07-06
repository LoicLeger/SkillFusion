import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import { parseIdFromParams } from './utils';
import { NotFoundError } from '../lib/errors';

export default {
    // Requête pour récuperer tous les badges
    getAll: async (req: Request, res: Response) => {
        const badges = await prisma.userHasBadge.findMany({ orderBy: { id: 'asc' } });
        res.json(badges);
    },

    // Requête pour récuperer un badge par son id
    assigneBadge: async (req: Request, res: Response) => {
        const badge = await prisma.badge.findUnique({ where: { id: req.body.badgeId } });
        if (!badge) {
            throw new NotFoundError(`Badge with id ${req.body.badgeId} not found`);
        }
        await prisma.userHasBadge.create({
            data: {
                userId: req.body.userId,
                badgeId: req.body.badgeId,
            },
        });
        res.json(badge);
    },

    // Requête pour supprimer un badge
    deleteBadge: async (req: Request, res: Response) => {
        const badgeId = await parseIdFromParams(req.params.id);
        const badgeToDelete = await prisma.userHasBadge.findUnique({ where: { id: badgeId } });
        if (!badgeToDelete) {
            throw new NotFoundError(`Badge with id ${badgeId} not found`);
        }
        await prisma.userHasBadge.delete({ where: { id: badgeId } });
        res.status(204).send();
    },
};
