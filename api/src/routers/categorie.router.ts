import express from 'express';
import categorieController from '../controllers/categorie.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, ROLES } from '../middlewares/rbac.middleware';

const router = express.Router();

// Route public
router.get('/categories', categorieController.getAll);
router.get('/categories/:id', categorieController.getOneCategorie);

// Route dédié à l'admin (selon les User Stories)
router.post(
    '/categories',
    verifyToken,
    checkRoles([ROLES.ADMIN]),
    categorieController.createCategorie
);
router.patch(
    '/categories/:id',
    verifyToken,
    checkRoles([ROLES.ADMIN]),
    categorieController.updatingCategorie
);
router.delete(
    '/categories/:id',
    verifyToken,
    checkRoles([ROLES.ADMIN]),
    categorieController.deleteCategorie
);

export default router;
