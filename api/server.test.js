const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('./server.js');

const gordon = {username: 'gordon', password: 'password'};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').delete();
});

afterAll(async () => {
  await db.destroy();
});

test('sanity check', () => {
  expect(true).toBe(true);
});

describe('AUTH endpoints', () => {
  describe('[POST] /register', () => {
    test('should return a status code of 201', async () => {
      const res = await request(server).post('/api/auth/register').send(gordon);
      expect(res.status).toBe(201);
    });
    test('should return a status code of 400 if username is not provided', async () => {
      const res = await request(server).post('/api/auth/register').send({password: 'password'});
      expect(res.status).toBe(400);
    });
    test('should return the correct format of user object upon successful registration', async () => {
      const res = await request(server).post('/api/auth/register').send(gordon);
      expect(res.body).toMatchObject({user_id: 2, username: 'gordon', password: expect.anything()});
    });
  });

  describe('[POST] /login', () => {
    test('should return a status code of 200 upon successful login', async () => {
      await request(server).post('/api/auth/register').send(gordon);
      const res = await request(server).post('/api/auth/login').send(gordon);
      expect(res.status).toBe(200);
    });
    test('should return a token after successful login', async () => {
      await request(server).post('/api/auth/register').send(gordon);
      const res = await request(server).post('/api/auth/login').send(gordon);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toMatchObject({token: expect.anything()});
    });
    test('should return the correct welcome message after successful login', async () => {
      await request(server).post('/api/auth/register').send(gordon);
      const res = await request(server).post('/api/auth/login').send(gordon);
      expect(res.body).toMatchObject({message: 'Welcome gordon!'});
    });
    test('should return a status code of 400 if username is not provided', async () => {
      await request(server).post('/api/auth/register').send(gordon);
      const res = await request(server).post('/api/auth/login').send({password: 'password'});
      expect(res.status).toBe(400);
    });
  });
});