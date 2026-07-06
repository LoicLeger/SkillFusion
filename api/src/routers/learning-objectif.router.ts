import express from 'express';
import learningObjectifController from '../controllers/learning-objectif.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes publiques
router.get('/learning-objectifs', learningObjectifController.getAll);
router.get('/learning-objectifs/:id', learningObjectifController.getOneLearningObjectif);

// Routes dédiées aux enseignants et à l'admin
router.post(
    '/learning-objectifs',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    learningObjectifController.createLearningObjectif
);
router.patch(
    '/learning-objectifs/:id',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    learningObjectifController.updatingLearningObjectif
);
router.delete(
    '/learning-objectifs/:id',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    learningObjectifController.deleteLearningObjectif
);

export default router;
