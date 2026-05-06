import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";
import { AuthenticatedRequest } from "../@types/express";

export default {
    // Requête pour récuperer toutes les catégories
    getAll: async (req: Request, res: Response) => {
        const categories = await prisma.category.findMany();
        res.json(categories);
    },

    // Requête pour récuperer une catégorie par son id
    getOneCategorie: async (req: Request, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }
        res.json(category);
    },

    // Requête pour créer une catégorie
    createCategorie: async (req: AuthenticatedRequest, res: Response) => {
        const createCategoryBodySchema = z.object({
            name: z.string().min(1),
            description: z.string().optional(),
            textColor: z.string(),
            borderColor: z.string(),
            backgroundColor: z.string(), // c'est dans le schema prisma
        });
        const data = await createCategoryBodySchema.parseAsync(req.body);

        const alreadyExistingCategory = await prisma.category.findFirst({ where: { name: data.name } });
        if (alreadyExistingCategory) {
            throw new ConflictError(`Category name already taken : ${data.name}`);
        }

        const createdCategory = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                textColor: data.textColor,
                borderColor: data.borderColor,
                backgroundColor: data.backgroundColor, // c'est dans le schema prisma
            }
        });
        res.status(201).json(createdCategory);
    },

    // Requête pour mettre à jour une catégorie
    updatingCategorie: async (req: AuthenticatedRequest, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const updateCategoryBodySchema = z.object({
            name: z.string().min(1).optional(),
            description: z.string().optional(),
            textColor: z.string().optional(),
            borderColor: z.string().optional(),
            backgroundColor: z.string().optional(), 
        });

        const { name, description, textColor, borderColor, backgroundColor } = await updateCategoryBodySchema.parseAsync(req.body);

        const categoryToUpdate = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!categoryToUpdate) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const alreadyExistingCategory = await prisma.category.findFirst({ where: { name: name } });
        // en phase de test, je veux bien qu'on vérifie si on peut mettre le meme nom que celui qu'on modifie sans recevoir d'erreur, si erreur, je propose : 
        // const alreadyExistingCategory = await prisma.category.findFirst({ 
        //    where: { name: name, id: { not: categoryId } } // ← exclut la catégorie en cours de modification/});


        if (alreadyExistingCategory) {
            throw new ConflictError(`Category name already taken : ${name}`);
        }


        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: {
                name: name ?? categoryToUpdate.name,
                description: description ?? categoryToUpdate.description,
                textColor: textColor ?? categoryToUpdate.textColor,
                borderColor: borderColor ?? categoryToUpdate.borderColor,
                backgroundColor: backgroundColor ?? categoryToUpdate.backgroundColor, // Présent dans le schema prisma
            }
        });
        res.json(updatedCategory);
    },

    // Requête pour supprimer une catégorie
    deleteCategorie: async (req: Request, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const categoryToDelete = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!categoryToDelete) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        await prisma.category.delete({ where: { id: categoryId } });
        res.status(204).end();
    },
}