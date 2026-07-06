import express from 'express';
import coursStartedController from '../controllers/coursStarted.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();


router.get(
    '/cours-started/user/:id/ended',
    verifyToken,
    checkRoles([ROLES.STUDENT, ROLES.ADMIN]),
    coursStartedController.getEndedCoursByUser
);


router.get('/cours-started', verifyToken, checkRoles([ROLES.ADMIN]), coursStartedController.getAll);


router.get('/cours-started/user/:id', verifyToken, coursStartedController.getByUser);


router.get('/cours-started/:id', verifyToken, coursStartedController.getOneCoursActive);


router.post('/cours-started', verifyToken, coursStartedController.createCoursActive);

router.patch('/cours-started/:id', verifyToken, coursStartedController.updatingCoursActive);


router.delete('/cours-started/:id', verifyToken, coursStartedController.deleteCoursActive);

export default router;
