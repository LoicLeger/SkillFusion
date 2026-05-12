import type { Request, Response } from 'express';
import { prisma } from '../models/client';
import z from 'zod';
import { parseIdFromParams } from './utils';
import type { AuthenticatedRequest } from '../@types/express';
import { ForbiddenError, NotFoundError } from '../lib/errors';
import { ROLES } from '../middlewares/rbac.middleware';
import { /* sendReportEmail */ } from '../lib/mailer';

export default {
    // Requête pour récuperer tous les commentaires
    getAll: async (req: Request, res: Response) => {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    },

    // Requête pour récuperer un commentaire par son id
    getOneComment: async (req: Request, res: Response) => {
        const commentId = await parseIdFromParams(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }
        res.json(comment);
    },

    // Requête pour créer un commentaire
    createComment: async (req: AuthenticatedRequest, res: Response) => {
        const createCommentBodySchema = z.object({
            description: z.string().min(1),
            authorId: z.number(),
            coursId: z.number(),
        });
        const data = await createCommentBodySchema.parseAsync(req.body);

        const createdComment = await prisma.comment.create({
            data: {
                description: data.description,
                authorId: req.user!.userId,
                coursId: data.coursId,
            },
        });

        await prisma.notification.create({
            data: {
                content: data.description,
                coursId: data.coursId,
                userId: data.authorId,
                targetId: createdComment.id,
            },
        });

        res.status(201).json(createdComment);
    },

    // Requête pour mettre à jour un commentaire
    updatingComment: async (req: AuthenticatedRequest, res: Response) => {
        const commentId = await parseIdFromParams(req.params.id);
        const updateCommentBodySchema = z.object({
            description: z.string().min(1),
            authorId: z.number(),
            coursId: z.number(),
        });
        const { description, coursId } = await updateCommentBodySchema.parseAsync(req.body);

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }

        // Vérifier la propriété du commentaire avant de permettre la mise à jour
        if (req.user?.userId !== comment.authorId) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à modifier ce commentaire");
        }

        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: {
                description: description,
                authorId: req.user!.userId,
                coursId: coursId,
            },
        });
        res.json(updatedComment);
    },

    // Requête pour supprimer un commentaire
    deleteComment: async (req: AuthenticatedRequest, res: Response) => {
        const commentId = await parseIdFromParams(req.params.id);

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }

        // By-pass admin pour la suppression d'un commentaire
        if (req.user?.userId !== comment.authorId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à supprimer ce commentaire");
        }

        await prisma.comment.delete({
            where: { id: commentId },
        });
        await prisma.notification.delete({
            where: { targetId: comment.id },
        });
        res.status(204).send();
    },

    // Requête pour signaler un commentaire

    reportComment: async (req: AuthenticatedRequest, res: Response) => {
        const commentId = Number(req.params.id);
        const { reason } = req.body;

        //  Récupérer le commentaire + son auteur
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                author: {
                    select: {
                        id: true,
                        pseudo: true,
                    },
                },
            },
        });

        if (!comment) {
            throw new NotFoundError('Commentaire introuvable');
        }

        //  Récupérer le user qui signale
        const reporter = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: {
                id: true,
                pseudo: true,
            },
        });

        //  Envoi du mail admin
        await sendReportEmail(
            reason,
            commentId,
            reporter?.id ?? null,
            comment.description,
            reporter?.pseudo ?? 'Anonyme',
            comment.author?.pseudo ?? 'Inconnu'
        );

        return res.status(200).json({
            message: 'Signalement envoyé',
        });
    },
};
