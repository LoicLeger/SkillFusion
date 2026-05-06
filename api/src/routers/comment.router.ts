import express from "express";
import commentController from "../controllers/comment.controller";
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, requireSelfOrAdmin, ROLES } from '../middlewares/rbac.middleware';
import { sendReportEmail } from "../services/mailer";

const router = express.Router();

router.get("/comments", commentController.getAll)

router.get("/comments/:id", commentController.getOneComment)

router.post("/comments", verifyToken, checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]), commentController.createComment)

router.patch("/comments/:id", verifyToken,  commentController.updatingComment)

router.delete("/comments/:id", verifyToken, commentController.deleteComment)

router.post("/comments/:id/report", verifyToken, commentController.reportComment)

export default router;