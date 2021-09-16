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

function findById(user_id) {
  console.log("in the model findById", user_id);
  return db('users')
    .where({ user_id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'user_id');
  console.log(id);
  return findById(id);
}

module.exports = {
  find,
  findBy,
  findById,
  add
};

