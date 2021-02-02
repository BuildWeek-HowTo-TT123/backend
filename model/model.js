const db = require("../database/config")

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

/* async function addClient(user) {
  const [id] = await db("clients").insert(user);
  console.log("model", id);
  return findByClientId(id);
} */

//
/* function findInstructors() {
  return db("instructors").select("id", "name", "username");
} */

function find() {
  return db("users").select("id", "name", "username");
}

function findById(id) {
  return db("users")
    .select("id", "name", "username")
    .where({ id })
    .first();
}

/* function findByClientId(id) {
  return db("clients")
    .select("id", "name", "username", "role")
    .where({ id })
    .first();
} */

/* function findByInstructors(filter) {
  return db("instructors").select("*").where(filter);
} */

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
