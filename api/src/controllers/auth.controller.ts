import type { Request, Response } from 'express';
import argon2 from 'argon2';
import { includes, z } from 'zod';
import { prisma, User } from '../models/client';
import { config } from '../config';
import type { Token } from '../@types/index.d.ts';
import { BadRequestError, ConflictError, UnauthorizedError } from '../lib/errors';
import { generateAuthTokens } from '../lib/token';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest } from '../@types/express';
import crypto from 'crypto';
import { sendVerificationEmail, sendResetPasswordEmail } from '../lib/mailer';

// Token management functions --------------------------------------------------------------------

function setRefreshTokenCookie(res: Response, refreshToken: Token) {
    res.cookie('refreshToken', refreshToken.token, {
        httpOnly: true,
        secure: config.isProd,
        sameSite: config.isProd ? 'none' : 'lax',
        maxAge: refreshToken.expiresIn,
        path: '/auth/refresh',
    });
}

async function replaceRefreshTokenInDatabase(refreshToken: Token, user: User) {
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    await prisma.refreshToken.create({
        data: {
            token: refreshToken.token,
            userId: user.id,
        },
    });
}
// Register controller --------------------------------------------------------------------
export async function registerUser(req: Request, res: Response) {
    const registerUserBodySchema = z.object({
        pseudo: z.string().min(3),
        email: z.email(),
        password: z
            .string()
            .min(2)
            .max(100)
            .regex(/[a-z]/)
            .regex(/[A-Z]/)
            .regex(/[!@#$%&*-+{}?]/),
        confirmPassword: z.string(),
    });

    // Vérifier le typage d'entrée
    const { pseudo, email, password, confirmPassword } = await registerUserBodySchema.parseAsync(
        req.body
    );

    // verifier pwd/confirmation
    if (password !== confirmPassword) {
        throw new BadRequestError('Mot de passe et confirmation ne correspondent pas');
    }
    // vérifier que l'email est unique
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new ConflictError('Email déjà utilisé');
    }

    const existingUserPseudo = await prisma.user.findUnique({ where: { pseudo: pseudo } });
    if (existingUserPseudo) {
        throw new ConflictError('Pseudo déjà utilisé');
    }

    // Hasher le password
    const hashedPassword = await argon2.hash(password);

    // crée l'utilisateur en db
    const user = await prisma.user.create({
        data: {
            pseudo,
            email,
            password: hashedPassword,
            roleId: 1,
        },
    });

    const token = crypto.randomBytes(32).toString('hex');
    await prisma.user.update({
        where: { id: user.id },
        data: { verifyToken: token },
    });
    await sendVerificationEmail(email, token);

    res.status(201).json({
        id: user.id,
        pseudo: user.pseudo,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        message: 'Inscription réussie ! Vérifie ton email pour activer ton compte.',
    });
}

// Login Controller --------------------------------------------------------------------

export async function loginUser(req: Request, res: Response) {
    // valider le payload de la requete (nature des valeurs)
    const loginUserSchema = z.object({
        email: z.string(),
        password: z.string(),
    });
    const { email, password } = await loginUserSchema.parseAsync(req.body);

    // récupérer l'utilisateur ds la db
    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    });
    if (!user) {
        throw new UnauthorizedError('Le login et le mot de passe ne correspondent pas');
    }

    if (!user.verified) {
        throw new UnauthorizedError('Confirme ton email avant de te connecter.');
    }
    // vérifier que le mot de passe et le hash correspondent
    const isMatching = await argon2.verify(user.password, password);
    if (!isMatching) {
        throw new UnauthorizedError('Le login et le mot de passe ne correspondent pas');
    }

    // générer les 2 token (access/refresh)
    const { accessToken, refreshToken } = generateAuthTokens(user);

    // stockage du refresh token en DB
    await replaceRefreshTokenInDatabase(refreshToken, user);

    setRefreshTokenCookie(res, refreshToken);
    // renvoyer les token vers l'utilisateur
    res.json({ accessToken, user: { id: user.id, pseudo: user.pseudo, role: user.role.name } });
}

// Authenticated user controller --------------------------------------------------------------------

export async function getAuthenticatedUser(req: AuthenticatedRequest, res: Response) {
    // req.user est garanti par le middleware checkRoles en amont
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) {
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette resource");
    }
    res.json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}

// logoutUser controller --------------------------------------------------------------------

export async function logoutUser(req: AuthenticatedRequest, res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    if (req.user) {
        await prisma.refreshToken.deleteMany({ where: { userId: req.user.userId } });
    }
    res.status(204).end();
}

export async function refreshAccessToken(req: Request, res: Response) {
    const receivedRefreshToken = req.cookies.refreshToken;
    if (!receivedRefreshToken) {
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette resource");
    }

    // Vérifier la signature JWT avant d'interroger la base de données
    try {
        jwt.verify(receivedRefreshToken, config.jwtSecret, { audience: 'refresh' });
    } catch {
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette resource");
    }

    const existingRefreshToken = await prisma.refreshToken.findUnique({
        where: { token: receivedRefreshToken },
        include: { user: { include: { role: true } } },
    });

    if (!existingRefreshToken) {
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette resource");
    }

    const { accessToken, refreshToken } = generateAuthTokens(existingRefreshToken.user);

    await replaceRefreshTokenInDatabase(refreshToken, existingRefreshToken.user);

    setRefreshTokenCookie(res, refreshToken);

    res.json({
        accessToken,
        user: {
            id: existingRefreshToken.user.id,
            pseudo: existingRefreshToken.user.pseudo,
            role: existingRefreshToken.user.role.name,
        },
    });
}

export async function verifyEmail(req: Request, res: Response) {
    const { token } = req.query as { token: string };

    const user = await prisma.user.findFirst({
        where: { verifyToken: token },
    });

    if (!user) {
        throw new BadRequestError('Token invalide ou expiré');
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { verified: true, verifyToken: null },
    });

    res.json({ message: 'Compte vérifié ! Tu peux maintenant te connecter.' });
}

// Demande de réinitialisation
export async function forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    // On répond toujours OK pour ne pas révéler si l'email existe
    if (!user) {
        return res.json({ message: 'Si cet email existe, un lien a été envoyé.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    await prisma.user.update({
        where: { id: user.id },
        data: { resetToken: token, resetTokenExpiry: expiry },
    });

    await sendResetPasswordEmail(email, token);

    res.json({ message: 'Si cet email existe, un lien a été envoyé.' });
}

// Réinitialisation du mot de passe
export async function resetPassword(req: Request, res: Response) {
    // Schema de validation Zod
    const resetPasswordSchema = z.object({
        token: z.string().min(1),
        password: z
            .string()
            .min(2)
            .max(100)
            .regex(/[a-z]/) // au moins une minuscule
            .regex(/[A-Z]/) // au moins une majuscule
            .regex(/[!@#$%&*-+{}?]/), // au moins un caractère spécial
    });

    const { token, password } = await resetPasswordSchema.parseAsync(req.body);

    // Vérifie que le token existe en BDD et qu'il n'est pas expiré
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: { gt: new Date() }, // vérifie que le token n'est pas expiré
        },
    });

    // Si aucun utilisateur n'est trouvé, le token est invalide ou expiré
    if (!user) {
        throw new BadRequestError('Token invalide ou expiré.');
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await argon2.hash(password);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        },
    });

    res.json({ message: 'Mot de passe réinitialisé avec succès !' });
}
