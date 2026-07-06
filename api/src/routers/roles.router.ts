import express from 'express';
import rolesController from '../controllers/roles.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes publiques
router.get('/roles', rolesController.getAll);
router.get('/roles/:id', rolesController.getOneRoles);

// Routes dédiées à l'admin pour la gestion des roles
router.post('/roles', verifyToken, checkRoles([ROLES.ADMIN]), rolesController.createRoles);
router.patch('/roles/:id', verifyToken, checkRoles([ROLES.ADMIN]), rolesController.updateRoles);
router.delete('/roles/:id', verifyToken, checkRoles([ROLES.ADMIN]), rolesController.deleteRoles);

export default router;
