const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find() {
  // not currently used or working as expected 
  // const ingredientInfo = db('instruction_ingredients as ii')
  //   .join('ingredients as i', 'ii.ingredient_id', 'i.ingredient_id')
  //   .where(filter);

  // const ingredientResult = {
  //   ingredient_id: ingredientInfo.ingredient_id,
  //   ingredient_name: ingredientInfo.name,
  // }

  // ingredientInfo.forEach(ingredient => {
  //   ingredientResult.ingredient_name = ingredient.name;
  // });

  // return ingredientResult;
  return db('ingredients');
}

function findById(ingredient_id) {
  return db('ingredients')
    .where({ ingredient_id })
    .first();
}

function add(ingredient) {
  return db('ingredients')
    .insert(ingredient, 'ingredient_id')
    .then(ids => {
      return findById(ids[0]);
    });
}

function remove(ingredient_id) {
  return db('ingredients')
    .where({ ingredient_id })
    .del();
}

function update(ingredient_id, changes) {
  return db('ingredients')
    .where({ ingredient_id })
    .update(changes, '*');
}