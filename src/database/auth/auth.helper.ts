import { db } from '../dbConfig';
import { User } from '../../models/User';

export const find = async () => {
  const users = await db<User>('users');
  return users;
};

export const findBy = async (where: Partial<User>) => {
  const [resource] = await db<User>('users').where(where);
  if (!resource) throw new Error('404');
  return resource;
};

export const insert = async (body: User) => {
  try {
    const user = await findBy({ username: body.username });
    throw new Error('409');
  } catch {
    const [id] = await db<User>('users').insert(body);
    return await findBy({ id });
  }
};

export const update = async (body: User, id: string | number) => {
  await findBy({ id });
  const count = await db<User>('users')
    .where({ id })
    .update(body);
  if (!count) throw new Error('Did not update!');

  return await findBy({ id: body.id || id });
};

export const remove = async (id: string | number) => {
  const user = await findBy({ id });
  const count = await db<User>('users')
    .where({ id })
    .del();
  if (!count) throw new Error('Did not remove!');

  return user;
};
