import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../lib/errors';
import { config } from '../config';
import logger from '../lib/logger';
import type { AuthenticatedRequest } from '../@types/express';

// Middleware pour vérifier le token

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = extractAccessToken(req);
    const { userId, role } = verifyAndDecodeJWT(token);
    req.user = { userId, role };
    next();
}

// Middleware pour extraire le token du header Authorization

export function extractAccessToken(req: Request): string {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette ressource");
    }

    return authHeader.split(' ')[1];
}

// Vérifier et décoder le JWT

export function verifyAndDecodeJWT(accessToken: string): JwtPayload {
    try {
        const payload = jwt.verify(accessToken, config.jwtSecret, {
            audience: 'access',
        }) as JwtPayload;
        return payload;
    } catch (error) {
        logger.warn('JWT verification failed:', error);
        throw new UnauthorizedError("Vous n'êtes pas autorisé à accéder à cette ressource");
    }
}
