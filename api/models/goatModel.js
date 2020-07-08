const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findByUser,
  add,
  addGoat,
  update,
  remove
};

function find() {
  return db(`goats`);
}
function findById(id) {
  return db(`goats`).where({ id });
}
async function findByUser(user_id) {
  return await db('goats').where({user_id})
}
async function add(goat) {
  const [id] = await db('goats').insert(goat).into('goats');

  return findById(id);
}
function update(id, changes) {
  return db(`goats`)
    .where({ id })
    .update(changes);
}
function remove(id) {
  return db(`goats`)
    .where({ id })
    .delete();
}
function addGoat(goat) {
    return db('goats')
    .insert(goat)
    .into('goats');
    }