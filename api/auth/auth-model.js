const db = require('../data/dbConfig.js');

function find() {
  return db('users');
}

function findBy(filter) {
  console.log(filter);
  console.log("in the findBy model")
  return db('users')
    .where(filter);
}

function findById(id) {
  console.log("in the model findById", id);
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  console.log(id);
  return findById(id);
}

module.exports = {
  find,
  findBy,
  findById,
  add
};

