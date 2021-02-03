const db = require("../database/config")

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}



function find() {
  return db("users").select("id", "name", "username");
}

function findById(id) {
  return db("users")
    .select("id", "name", "username")
    .where({ id })
    .first();
}



function findByHowtoz(filter) {
  return db("howtoz").select("*").where(filter);
}

//
function findHowtoz() {
  return db("howtoz").select("*");
}

//
function findClassById(id) {
  return db("classes").select("*").where({ id });
}

module.exports = {
  add,
  
  find,
  
  findById,
  
  findByHowtoz,
  findHowtoz,
  
  findClassById,
};
