import express from 'express';
import toolController from '../controllers/tool.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes publiques
router.get('/tools', toolController.getAll);
router.get('/tools/:id', toolController.getOneTool);

// Routes réservées à l'admin
router.post('/tools', verifyToken, checkRoles([ROLES.ADMIN]), toolController.createTool);
router.patch('/tools/:id', verifyToken, checkRoles([ROLES.ADMIN]), toolController.updatingTool);
router.delete('/tools/:id', verifyToken, checkRoles([ROLES.ADMIN]), toolController.deleteTool);

export default router;
