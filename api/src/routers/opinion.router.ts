import express from 'express';
import opinionController from '../controllers/opinion.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes publiques
router.get('/opinions', opinionController.getAll);
router.get('/opinions/:coursId/user/:id', opinionController.getByUser);
router.get('/opinions/:id', opinionController.getOneOpinion);

router.post(
    '/opinions',
    verifyToken,
    checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]),
    opinionController.createOpinion
);
router.patch('/opinions/:id', verifyToken, opinionController.updateOpinion);
router.delete('/opinions/:id', verifyToken, opinionController.deleteOpinion);

export default router;
