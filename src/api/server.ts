import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as session from 'express-session';

import { requiresAuth } from '../middleware/authenticate.middleware';
import { authRouter } from '../routes/auth/auth.routes';
import { jokesRouter } from '../routes/jokes/jokes.routes';

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    name: 'sid',
    secret: 'secret',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: false
    },
    resave: false,
    saveUninitialized: true
  })
);

server.use('/api/auth', authRouter);
server.use('/api/jokes', requiresAuth(), jokesRouter);
