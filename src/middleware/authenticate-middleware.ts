import { Middleware } from '../models/middleware.model';

export const requiresAuth: Middleware = () => async (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });
};
