import express from 'express';
import userHasBadgeController from '../controllers/userHasBadgeBadge.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Route Public
router.get('/userHasBadge', userHasBadgeController.getAll);

// Route dédié à l'admin (selon les User Stories)
router.post(
    '/userHasBadge',
    verifyToken,
    checkRoles([ROLES.ADMIN]),
    userHasBadgeController.assigneBadge
);

router.delete(
    '/userHasBadge/:id',
    verifyToken,
    checkRoles([ROLES.ADMIN]),
    userHasBadgeController.deleteBadge
);

export default router;
