import express from 'express';
import notificationController from '../controllers/notification.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Route dédiée a l'admin pour la gestion des notifications
router.get("/notifications", verifyToken, checkRoles([ROLES.ADMIN]), notificationController.getAll)
router.get("/notifications/instructor/:id", notificationController.getNotificationByInstructor)
// Utilisateur connecté — Propiété vérifiée dans le controller
router.get("/notifications/:id", verifyToken, notificationController.getOneNotification)
router.patch("/notifications/:id", verifyToken, notificationController.updatingNotification)
router.delete("/notifications/:id", verifyToken, notificationController.deleteNotification)

// Créées par le système via l'admin
router.post("/notifications", verifyToken, checkRoles([ROLES.ADMIN]), notificationController.createNotification)


export default router;