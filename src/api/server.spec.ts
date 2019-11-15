import * as supertest from 'supertest';

import { db } from '../database/dbConfig';
import { server } from './server';

const agent = supertest.agent(server);
const stan = {
  username: 'Stan',
  password: 'Lee',
  hash: '$2b$12$FRKAHASVNzXBGFJ9nC5nZOqyL1QXDkM51Yob7k5VYOyf0j2Js/iUS'
};

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 when no body is provided', async () => {
      const response = await agent.post('/api/auth/register');
      expect(response.status).toBe(400);
    });

    it('should add a user to the database', async () => {
      await agent
        .post('/api/auth/register')
        .send({ username: stan.username, password: stan.password });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should allow login of a previous user', async () => {
      await db('users').insert({ username: stan.username, password: stan.hash });

      const response = await agent
        .post('/api/auth/login')
        .send({ username: stan.username, password: stan.password });

      expect(response.status).toBe(200);
    });

    it('should return 401 when the password is incorrect', async () => {
      const response = await agent
        .post('/api/auth/login')
        .send({ username: stan.username, password: 'wrong' });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/jokes', () => {
    it('should return 401 prior to login', async () => {
      const response = await agent.get('/api/jokes');
      expect(response.status).toBe(401);
    });

    it('should return 200 after login', async () => {
      await db('users').insert({ username: stan.username, password: stan.hash });

      await agent
        .post('/api/auth/login')
        .send({ username: stan.username, password: stan.password });

      const response = await agent.get('/api/jokes');
      expect(response.status).toBe(200);
    });
  });
});
