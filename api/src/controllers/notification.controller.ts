import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ForbiddenError, NotFoundError } from "../lib/errors";
import type { AuthenticatedRequest } from "../@types/express";
import { ROLES } from "../middlewares/rbac.middleware";


export default {
    // Requête pour récuperer toutes les notifications
    getAll: async (req: Request, res: Response) => {
        const notifications = await prisma.notification.findMany();
        res.json(notifications);
    },
    getNotificationByInstructor:async (req: Request, res: Response)=>{
        const instructorId = await parseIdFromParams(req.params.id)
        const comments = await prisma.notification.findMany({
            include:{
                cours:{select:{authorId:true,title:true,slug:true}},
                user:{select:{pseudo:true}}
            },
            where:{cours:{authorId:instructorId}}
        })
        res.json(comments)
    },

    // Requête pour récuperer une notification par son id
    getOneNotification: async (req: AuthenticatedRequest, res: Response) => {
        const notificationId = await parseIdFromParams(req.params.id);
        const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
        if (!notification) {
            throw new NotFoundError(`Notification with id ${notificationId} not found`);
        }
        // Seul le propriétaire ou un admin peut lire la notification
        if (notification.userId !== req.user!.userId && req.user?.role !== ROLES.ADMIN) {
            throw new ForbiddenError("Vous n'êtes pas autorisé à accéder à cette notification");
        }

        res.json(notification);
    },

    // Requête pour créer une notification
    createNotification: async (req: Request, res: Response) => {
        const createNotificationBodySchema = z.object({
            content: z.string().min(1),
            coursId: z.number().int(),
            userId: z.number().int(),
            target: z.number().int()
        });
        const data = await createNotificationBodySchema.parseAsync(req.body);

        const createdNotification = await prisma.notification.create({
            data: {
                content: data.content,
                userId: data.userId,
                coursId: data.coursId,
                targetId:data.target
            }
        });
        res.status(201).json(createdNotification);
    },

    // Requête pour mettre à jour une notification
    updatingNotification: async (req: Request, res: Response) => {
        const notificationId = await parseIdFromParams(req.params.id);
        const updateNotificationBodySchema = z.object({
            content: z.string().min(1).optional(),
            coursId: z.number().int().optional(),
            userId: z.number().int().optional(),
            seen:z.boolean().optional()
        });
        const data= await updateNotificationBodySchema.parseAsync(req.body);
        const updatedNotification = await prisma.notification.update({
            where: { id: notificationId },
            data
        });
        res.json(updatedNotification);
    },

    // Requête pour supprimer une notification
    deleteNotification: async (req: Request, res: Response) => {
        const notificationId = await parseIdFromParams(req.params.id);
        await prisma.notification.delete({ where: { id: notificationId } });
        res.status(204).send();
    },
}