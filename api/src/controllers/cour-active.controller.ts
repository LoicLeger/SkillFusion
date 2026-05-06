import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { NotFoundError } from "../lib/errors";

export default {
    // Requête pour récuperer tous les cours actives
    getAll: async (req: Request, res: Response) => {
        const coursActives = await prisma.coursActived.findMany();
        res.json(coursActives);

    },
    // Requête pour récuperer tous les cours actives d'un étudiant
    getByUser: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const coursByUser = await prisma.coursActived.findMany({
            where: { userId: userId, cours: {visibility: true }},
            include: {
                cours: { include: { category: true } },
            }
        })
        if (!coursByUser) {
            throw new NotFoundError(`Cours active with id ${coursByUser} not found`);
        }
        res.json(coursByUser);
    },
    // Requête pour récuperer un cours active par son id
    getOneCoursActive: async (req: Request, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);
        const coursActive = await prisma.coursActived.findUnique({ where: { id: coursActiveId } });
        if (!coursActive) {
            throw new NotFoundError(`Cours active with id ${coursActiveId} not found`);
        }
        res.json(coursActive);
    },

    // Requête pour créer un cours active
    createCoursActive: async (req: Request, res: Response) => {
        const createCoursActiveBodySchema = z.object({
            coursId: z.number(),
            userId: z.number(),
            IsEnd: z.boolean(),
        });
        const data = await createCoursActiveBodySchema.parseAsync(req.body);

        const alreadyExistingCours = await prisma.coursActived.findFirst({ where: { coursId: data.coursId, userId: data.userId } });
        if (alreadyExistingCours) {
            return res.status(204).end()
        }
        const createdCoursActive = await prisma.coursActived.create({
            data: {
                coursId: data.coursId,
                userId: data.userId,
                IsEnd: data.IsEnd,
            }
        });
        res.status(201).json(createdCoursActive);
    },

    // Requête pour mettre à jour un cours active
    updatingCoursActive: async (req: Request, res: Response) => {
        const updateCoursActiveBodySchema = z.object({
            coursId: z.number(),
            userId: z.number(),
            IsEnd: z.boolean(),
        });
        const data = await updateCoursActiveBodySchema.parseAsync(req.body);
        console.log(data)

        const dataCoursActive = await prisma.coursActived.findMany({
             where: { coursId: data.coursId, userId: data.userId  },
        })
        console.log(dataCoursActive)
        const updatedCoursActive = await prisma.coursActived.update({
            where: { id: dataCoursActive[0].id },
            data: {
            coursId: data.coursId,
                userId: data.userId,
                IsEnd: data.IsEnd
            }
        });
        res.json(updatedCoursActive);
    },

    // Requête pour supprimer un cours active
    deleteCoursActive: async (req: Request, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);
        const coursDeleted = await prisma.coursActived.delete({ where: { id: coursActiveId } });
        res.status(204).send();
    },

}