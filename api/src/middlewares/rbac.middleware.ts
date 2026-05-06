import type { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../lib/errors';
import type { AuthenticatedRequest } from '../@types/express';
import { extractAccessToken, verifyAndDecodeJWT } from './auth.middleware';

//  Définition des constantes des rôles 
const ROLES = {
  STUDENT: 1,
  INSTRUCTOR: 2,
  ADMIN: 3,
} as const;

export { ROLES };

//  Middleware d'autorisation basé sur les rôles (rappatrié du auth.middleware)

export function checkRoles(roles: number[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = extractAccessToken(req);
    const { userId, role } = verifyAndDecodeJWT(token);

    if (!roles.includes(role)) {
      throw new ForbiddenError(
        `Le rôle ${role} n'a pas la permission d'accéder à cette ressource`
      );
    }

    req.user = { userId, role };
    next();
  };
}

//  Middleware pour vérifier self ou admin 

export function requireSelfOrAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractAccessToken(req);
  const { userId, role } = verifyAndDecodeJWT(token);

  const resourceId = parseInt(req.params.id as string);

  if (userId !== resourceId && role !== role.admin) {
    throw new ForbiddenError(
      "Vous ne pouvez modifier que votre propre ressource"
    );
  }

  req.user = { userId, role };
  next();
}