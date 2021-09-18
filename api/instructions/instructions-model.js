const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find() {
  return db('instructions')
    // .where({ recipe_id })
    .orderBy('instruction_id', 'asc');
}

function findById(instruction_id) {
  return db('instructions')
    .where({ instruction_id })
    .first();
}

function add(instruction) {
  return db('instructions')
    .insert(instruction, 'instruction_id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(instruction_id) {
  return db('instructions')
    .where({ instruction_id })
    .del();
}

function update(instruction_id, instruction) {
  return db('instructions')
    .where({ instruction_id })
    .update(instruction);
}