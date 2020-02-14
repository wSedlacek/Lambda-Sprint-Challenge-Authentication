import { Router } from 'express';
import { insert, findBy } from '../database/auth/auth.helper';
import { compare, hash } from 'bcrypt';

export const authRouter = Router();

authRouter.post('/register', async ({ body, session }, res) => {
  try {
    if (!body.username || !body.password) throw new Error('400');
    const user = { ...body, password: await hash(body.password, 12) };
    const { password, ...saved } = await insert(user);
    session.uid = saved.id;
    res.status(201).json(saved);
  } catch (error) {
    if (error.toString() === 'Error: 400') res.status(400).json({ message: 'Bad Request' });
    else if (error.toString() === 'Error: 409')
      res.status(409).json({ message: 'User Already Exist' });
    else res.status(500).json(error.toString());
  }
});

authRouter.post('/login', async ({ body, session }, res) => {
  try {
    if (!body.username || !body.password) throw new Error('400');
    const { username, password } = body;
    const user = await findBy({ username });
    const valid = await compare(password, user.password);
    if (!valid) throw new Error('404');

    session.uid = user.id;
    res.status(200).json({ message: `Welcome ${user.username}!` });
  } catch (error) {
    if (error.toString() === 'Error: 400') res.status(400).json({ message: 'Bad Request' });
    else if (error.toString() === 'Error: 404')
      res.status(401).json({ message: 'Invalid Credentials' });
    else res.status(500).json(error);
  }
});
