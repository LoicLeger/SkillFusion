import { Router } from "express";
import usersController from "../controllers/users.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { checkRoles, requireSelfOrAdmin, ROLES } from "../middlewares/rbac.middleware";

export const router = Router();


// GET - Accessible à STUDENT, TEACHER, ADMIN
router.get("/users", verifyToken, checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]), usersController.getAllUsers);

// GET export - Juste vérifier le token
router.get("/users/me/export", verifyToken, usersController.exportMyData);

// GET :id - Accessible à STUDENT, TEACHER, ADMIN
router.get("/users/:id", verifyToken, checkRoles([ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN]), usersController.getUserById);

// POST - ADMIN only
router.post("/users", verifyToken, checkRoles([ROLES.ADMIN]), usersController.createUser);

// PATCH - self ou ADMIN
// router.patch("/users/:id", verifyToken, requireSelfOrAdmin, usersController.updateUser);
router.patch("/users/:id", verifyToken, checkRoles([ROLES.ADMIN]), usersController.updateUser);

// DELETE - self ou ADMIN
// router.delete("/users/:id", verifyToken, requireSelfOrAdmin, usersController.deleteUser);
router.delete("/users/:id", verifyToken, checkRoles([ROLES.ADMIN]), usersController.deleteUser);

router.delete("/users/me", verifyToken, usersController.deleteMyAccount);
