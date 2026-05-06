import express from "express";
import commentController from "../controllers/comment.controller";
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware'; 

const router = express.Router();

// Routes publiques
router.get("/comments", commentController.getAll)

router.get("/comments/:id", commentController.getOneComment)

// Création — accessible à tous les rôles connectés
router.post("/comments", verifyToken, checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]), commentController.createComment)

// Modification - propriété vérifiée dans le controller (auteur uniquement)
router.patch("/comments/:id", verifyToken, commentController.updatingComment)

// Suppression - propriété vérifiée dans le controller (auteur ou admin)
router.delete("/comments/:id", verifyToken, commentController.deleteComment)

export default router;