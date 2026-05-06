import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";

export default {
    // Requête pour récuperer tous les rôles
    getAll: async (req: Request, res: Response) => {
        const role = await prisma.role.findMany();
        res.json(role);
    },

    // Requête pour récuperer un rôle par son id
    getOneRoles: async (req: Request, res: Response) => {
        const roleId = await parseIdFromParams(req.params.id);
        const role = await prisma.role.findUnique({ where: { id: roleId } });
        if (!role) {
            throw new NotFoundError(`Role with id ${roleId} not found`);
        }
        res.json(role);
    },

    // Requête pour créer un rôle
    createRoles: async (req: Request, res: Response) => {
        const createRoleBodySchema = z.object({
            name: z.string(),
            frName: z.string(),
        });
        const data = await createRoleBodySchema.parseAsync(req.body);

         const alreadyExistingRole = await prisma.role.findFirst({ where: { name: data.name, } });
        if (alreadyExistingRole) {
            throw new ConflictError(`Role name already taken : ${data.name}`);
        }

        const createdRole = await prisma.role.create({
            data: {
                name: data.name,
                frName: data.frName,
            }
        });
        res.status(201).json(createdRole);

    },

    // Requête pour mettre à jour un rôle
    updateRoles: async (req: Request, res: Response) => {
        const roleId = await parseIdFromParams(req.params.id);
        const updateRoleBodySchema = z.object({
            name: z.string(),
            frName: z.string(),
        });
        const data = await updateRoleBodySchema.parseAsync(req.body);

        const roleToUpdate = await prisma.role.findUnique({ where: { id: roleId } });
        if (!roleToUpdate) {
            throw new NotFoundError(`Role with id ${roleId} not found`);
        }
        const alreadyExistingRole = await prisma.role.findFirst({ where:{ name: data.name } });
        if (alreadyExistingRole) {
            throw new ConflictError(`Role name already taken : ${data.name}`);
        }

        const updatedRole = await prisma.role.update({
            where: { id: roleId },
            data: {
                name: data.name,
                frName: data.frName,
            }
        });
        res.json(updatedRole);
    },

    // Requête pour supprimer un role
    deleteRoles: async (req: Request, res: Response) => {
        const roleId = await parseIdFromParams(req.params.id);
        await prisma.role.delete({ where: { id: roleId } });
        res.status(204).send();
    },
};