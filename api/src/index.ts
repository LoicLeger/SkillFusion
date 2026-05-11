import express from 'express';
import cors from 'cors';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { globalErrorHandler } from './middlewares/global-error-handler';

import { config } from './config';
import authRouter from './routers/auth.router';
import coursRouter from './routers/cours.router';
import categorieRouter from './routers/categorie.router';
import badgeRouter from './routers/badge.router';
import commentRouter from './routers/comment.router';
import { router as usersRouter } from './routers/users.router';
import opinionRouter from './routers/opinion.router';
import courContent from './routers/cour-content.router';
import notification from './routers/notification.router';
import coursActive from './routers/cour-active.router';
import tool from './routers/tool.router';
import learningObjectifRouter from './routers/learning-objectif.router';
import rolesRouter from './routers/roles.router';
import userHasBadge from './routers/userHasBadge.router';

const app = express();

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Trop de requêtes, veuillez réessayer plus tard.' },
});

//app.use(helmet());
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
);
//app.use(cors({ origin: config.allowedOrigins }));
app.use(
    cors({
        origin: config.corsOriginUrl,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json({ limit: '5mb' })); // Limite à 5mb pour la photo
app.use(xss());
app.use(globalLimiter);

app.use('/uploads', express.static('uploads'));
app.use('/auth', authRouter);
app.use('/api', coursRouter);
app.use('/api', categorieRouter);
app.use('/api', badgeRouter);
app.use('/api', commentRouter);
app.use('/api', opinionRouter);
app.use('/api', courContent);
app.use('/api', usersRouter);
app.use('/api', notification);
app.use('/api', coursActive);
app.use('/api', tool);
app.use('/api', learningObjectifRouter);
app.use('/api', rolesRouter);
app.use('/api', userHasBadge);

app.get('/', (req, res) => {
    res.send('Welcome to the SkillFusion API');
});

app.use(globalErrorHandler);

export default app;
