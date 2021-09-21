const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('./server.js');

const gordon = {username: 'gordon', password: 'password'};

const recipe_1 = {
  recipe_id: 5, 
	recipe_title: 'title_1',    // required
	recipe_source: 'source_2', // required   
	ingredients: 'onions',    // required
	instructions: 'chop onions',  // required
	user_id: 1,      // this references the id in the users table 
	category_id: 1,  // this references the id in the categories table
}

const recipe_2 = {
	recipe_title: 'new_title',    
	recipe_source: 'new_source',    
	ingredients: 'tomatoes',    
	instructions: 'chop tomatoes',   
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
//Esdras worked on this
describe('RECIPE endpoints', ()=>{
  describe('[GET] /recipes', ()=>{
    test('should return status 401 if token invalid', async () =>{
      const res = await request(server).get('/api/recipes')
      expect(res.status).toBe(401)
    })
    test('should return status 200 if token valid', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      let res = await request(server).post('/api/auth/login').send(gordon);
      res = await request(server).get('/api/recipes').set('Authorization', res.body.token)
      expect(res.status).toBe(200)
    })
  });
  describe('[GET] /recipes/:id', ()=>{
    test('should return staus 404 on invaild id(checkRecipeId)', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      const res = await request(server).get('/api/recipes/6').set('Authorization', login.body.token)
      expect(res.status).toBe(404)
    })
    test('should return status 200 on valid id', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      await request(server).post('/api/recipes').send(recipe_1).set('Authorization', login.body.token)
      const res = await request(server).get('/api/recipes/1').set('Authorization', login.body.token)
      expect(res.status).toBe(200)
    })
  });
  describe('[POST] /recipes', ()=>{
    test('should return status 201', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      const res = await request(server).post('/api/recipes').send(recipe_1).set('Authorization', login.body.token)
      expect(res.status).toBe(201)
    })
    test('should return proper message when required field is missing', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      let res = await request(server).post('/api/recipes').send({
        recipe_id: 5,     
	      recipe_source: 'source_2', 
        ingredients: 'onions',    
	      instructions: 'chop onions',     
	      user_id: 1,      
	      category_id: 1,
      }).set('Authorization', login.body.token)
      expect(res.body.message).toMatch(/title required/i)

      res = await request(server).post('/api/recipes').send({
        recipe_id: 5,
        recipe_title: 'title_1',      
        ingredients: 'onions',    
	      instructions: 'chop onions',     
	      user_id: 1,      
	      category_id: 1,
      }).set('Authorization', login.body.token)
      expect(res.body.message).toMatch(/source required/i)

      res = await request(server).post('/api/recipes').send({
        recipe_id: 5,
        recipe_title: 'title_1',
        recipe_source: 'source_2',          
	      instructions: 'chop onions',     
	      user_id: 1,      
	      category_id: 1,
      }).set('Authorization', login.body.token)
      expect(res.body.message).toMatch(/ingredients required/i)

      res = await request(server).post('/api/recipes').send({
        recipe_id: 5,
        recipe_title: 'title_1', 
        recipe_source: 'source_2',     
        ingredients: 'onions',         
	      user_id: 1,      
	      category_id: 1,
      }).set('Authorization', login.body.token)
      expect(res.body.message).toMatch(/instructions required/i)

    })
  });
  describe('[PUT] /recipes/:id', ()=>{
    test('should return status 200 on success', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      await request(server).post('/api/recipes').send(recipe_1).set('Authorization', login.body.token)
      const res = await request(server).put('/api/recipes/5').send(recipe_2).set('Authorization', login.body.token)
      expect(res.status).toBe(200)
    })
  });
  describe('[DELETE] /recipes/:id', ()=>{
    test('sould return proper message on deletion', async () =>{
      await request(server).post('/api/auth/register').send(gordon);
      const login = await request(server).post('/api/auth/login').send(gordon);
      await request(server).post('/api/recipes').send(recipe_1).set('Authorization', login.body.token)
      const res = await request(server).delete('/api/recipes/5').set('Authorization', login.body.token)
      expect(res.body.message).toMatch(/deleted/i)
    });
  });
});