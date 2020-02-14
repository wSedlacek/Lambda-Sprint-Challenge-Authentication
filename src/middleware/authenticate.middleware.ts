import { Middleware } from '../models/Middleware';
import { findBy } from '../database/auth/auth.helper';

export const requiresAuth: Middleware = () => async ({ session }, res, next) => {
  try {
    const id = session.uid;
    if (!id) throw new Error();

    const user = await findBy({ id });
    if (!user) throw new Error();

    return next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
};
