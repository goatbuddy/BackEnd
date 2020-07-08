const db = require("../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findByEmail,
  add,
  update,
  remove
};

function find() {
  return db("users");
}
function findBy(filter) {
  return db('users').where(filter);
}
function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db("users")
    .where({ email })
    .first();
}

function add(user) {
  return db('users')
  .insert(user)
  .into('users');
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function getContactsByUserId(UserId) {
    return db("contacts")
        .where({ UserId })
}