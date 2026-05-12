import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
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
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Trop de requêtes, veuillez réessayer plus tard.' },
});

// CORS public pour les routes accessibles depuis les emails
const publicCors = cors({
    origin: true,
    credentials: false,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'OPTIONS'],
});

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', verifyToken, getAuthenticatedUser);
router.get('/verify-email', publicCors, verifyEmail);
export default router;
