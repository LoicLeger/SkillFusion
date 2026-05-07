import 'dotenv/config';
import { PrismaClient } from '../../prisma/generated';
import { PrismaPg } from '@prisma/adapter-pg';

// On réexporte tous les modèles pour faciliter leur utilisatation dans le reste de l'application
export * from '../../prisma/generated';

// On exporte une connexion à la base de données
export const prisma = new PrismaClient({
    adapter: new PrismaPg(process.env.DATABASE_URL ?? ''),
});
