const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

async function find() {
  const recipes = await db('recipes')
  .orderBy('recipe_id', 'asc');

  return recipes;
} 

async function findById(recipe_id) {
  const recipeInfo = await db('recipes')
    .where({ recipe_id })
    .first();

  return recipeInfo;
}

async function add(recipe) {
  const [id] = await db('recipes').insert(recipe).returning('recipe_id');

  return id;
}

function remove(recipe_id) {
  return db('recipes')
    .where({ recipe_id })
    .del();
}

function update(recipe_id, changes) {
  return db('recipes')
    .where({ recipe_id })
    .update(changes);
}