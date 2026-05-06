import express from 'express';
import coursController from '../controllers/cours.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

export const router=express.Router()

router.get("/cours",coursController.getAll)
router.get("/cours/homepage",coursController.getForHomePage)
router.get("/cours/instructor/:id",coursController.getCoursByInstructor)
router.get("/cours/:id",coursController.getOneCours)

// Routes de modification
router.post("/cours", verifyToken, checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]), coursController.createCours)
router.post("/cours/:id/visibility", verifyToken, checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]),coursController.changeVisibility)
router.patch("/cours/:id", verifyToken, checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]), coursController.updatingCours)
router.delete("/cours/:id", verifyToken, checkRoles([ROLES.INSTRUCTOR, ROLES.ADMIN]), coursController.deleteCours)

export default router;