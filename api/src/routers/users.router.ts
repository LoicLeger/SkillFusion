import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

export const router = Router();

// GET all — ADMIN only (liste de tous les utilisateurs)
router.get('/users', verifyToken, checkRoles([ROLES.ADMIN]), usersController.getAllUsers);

// GET export — verifyToken suffit
router.get('/users/me/export', verifyToken, usersController.exportMyData);

// GET :id — ownership vérifié dans le controller
router.get('/users/:id', verifyToken, usersController.getUserById);

// POST — ADMIN only
router.post('/users', verifyToken, checkRoles([ROLES.ADMIN]), usersController.createUser);

// PATCH — ownership vérifié dans le controller
router.patch('/users/:id', verifyToken, usersController.updateUser);

// Routes - Delete
router.delete('/users/me', verifyToken, usersController.deleteMyAccount);
router.delete('/users/:id', verifyToken, usersController.deleteUser);
