import express from "express";
import coursActiveController from "../controllers/cour-active.controller";
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// router.get("/cours-active/user/:id/ended", verifyToken, requireSelfOrAdmin, coursActiveController.getEndedCoursByUser)
router.get("/cours-active/user/:id/ended", verifyToken, checkRoles( [ROLES.STUDENT, ROLES.ADMIN]),coursActiveController.getEndedCoursByUser)

// Route dédiée à l'admin — liste de tous les cours actifs
router.get("/cours-active", verifyToken, checkRoles([ROLES.ADMIN]), coursActiveController.getAll)

// Cours actifs d'un étudiant — propriété vérifié dans le controller
router.get("/cours-active/user/:id", verifyToken, coursActiveController.getByUser)

// Cours actif par son id — propriété vérifié dans le controller
router.get("/cours-active/:id", verifyToken, coursActiveController.getOneCoursActive)

// Activation d'un cours — userId pris depuis le token dans le controller
router.post("/cours-active", verifyToken, coursActiveController.createCoursActive)

// Mise à jour — propriété vérifié dans le controller
router.patch("/cours-active/:id", verifyToken, coursActiveController.updatingCoursActive)

// Suppression — propriété vérifié dans le controller
router.delete("/cours-active/:id", verifyToken, coursActiveController.deleteCoursActive)

export default router;