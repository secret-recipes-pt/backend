const Auth = require('./auth-model.js');
const db = require('../../data/dbConfig.js');

const gordon = {
  username: 'gordon',
  password: 'ramsey',
}

const guy = {
  username: 'guy',
  password: 'fierri',
}

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

describe('Auth Model for users', () => {
  describe('add function', () => {
    it('should insert a character to the user database', async () => {
      let all
      await Auth.add(gordon)
      all = await db('users')
      expect(all).toHaveLength(1)
    });
  });
  describe('find function', () => {
    it('should return all users in the user database', async () => {
      let all
      await Auth.add(gordon)
      await Auth.add(guy)
      all = await Auth.find()
      expect(all).toHaveLength(2)
    });
  });
  describe('findBy function', () => {
    it('should return a user by their username', async () => {
      let user
      await db('users').insert(gordon)
      user = await Auth.findBy({username: 'gordon'})
      expect(user.username).toBe('gordon')
    });
  });
  describe('findById function', () => {
    it('should return a user by their id', async () => {
      let user
      await db('users').insert({user_id: 1, ...gordon})
      console.log(gordon)
      user = await Auth.findById(1)
      expect(user.username).toBe('gordon')
    });
  });
});