//write recipe model here
const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find() {
  return db('recipes');
}

function findById(recipe_id) {
  return db('recipes')
    .where({ recipe_id })
    .first();
}

async function add(recipe) {
  const [id] = await db('recipes').insert(recipe, 'recipe_id');

  return findById(id);
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