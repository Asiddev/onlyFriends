const db = require("../../configs/db.config");

const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users; WHERE id = $1", [id]).then((data) => {
    return data.rows;
  });
};

const addUser = (email, password) => {
  return db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;",
    [email, password]
  );
};

module.exports = { getAllUsers, getUserById, addUser };
