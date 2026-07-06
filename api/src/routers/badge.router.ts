import express from 'express';
import badgeController from '../controllers/badge.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Route Public
router.get('/badges', badgeController.getAll);
router.get('/badges/:id', badgeController.getOneBadge);
router.get('/badges/user/:id', badgeController.getBadgesByUser);

// Route dédié à l'admin (selon les User Stories)
router.post('/badges', verifyToken, checkRoles([ROLES.ADMIN]), badgeController.createBadge);
router.patch('/badges/:id', verifyToken, checkRoles([ROLES.ADMIN]), badgeController.updatingBadge);
router.delete('/badges/:id', verifyToken, checkRoles([ROLES.ADMIN]), badgeController.deleteBadge);

export default router;
