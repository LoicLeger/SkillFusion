import express from 'express';
import courContent from '../controllers/cour-content.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Routes public
router.get(
    '/cours-contents',
    checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]),
    courContent.getAll
);
router.get(
    '/cours-contents/:id',
    checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]),
    courContent.getOneCourContent
);

// Routes dédiées aux enseignants et à l'admin pour les modifications
router.post(
    '/cours-contents',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    courContent.createCourContent
);
router.patch(
    '/cours-contents/:id',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    courContent.updatingCourContent
);
router.delete(
    '/cours-contents/:id',
    verifyToken,
    checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),
    courContent.deleteCourContent
);

export default router;
