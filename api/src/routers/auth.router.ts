import express from 'express';
import rateLimit from 'express-rate-limit';
import { verifyToken } from '../middlewares/auth.middleware';
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAuthenticatedUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
} from '../controllers/auth.controller';

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Trop de requêtes, veuillez réessayer plus tard.' },
});

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', verifyToken, getAuthenticatedUser);
router.get('/verify-email', verifyEmail);
export default router;
