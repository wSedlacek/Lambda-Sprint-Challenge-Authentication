import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { requiresAuth } from '../middleware/authenticate-middleware';
import { authRouter } from '../routes/auth.routes';
import { jokesRouter } from '../routes/jokes.routes';

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', requiresAuth, jokesRouter);
