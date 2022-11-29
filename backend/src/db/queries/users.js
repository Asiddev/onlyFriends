const db = require("../../configs/db.config");

const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1", [id]).then((data) => {
    return data.rows;
  });
};

const addUser = (email, password, name) => {
  return db.query(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;",
    [email, password, name]
  );
};

const addUserProfileInfoA = (id, profile_picture, banner_picture, description, location ) => {
  return db.query(
    `UPDATE users 
    SET profile_picture = $2, banner_picture = $3, description = $4, location = $5
    WHERE id = $1`,
    [id, profile_picture, banner_picture, description, location]
    );
};
const addUserProfileInfoB = (id,banner_picture, description, location ) => {
  return db.query(
    `UPDATE users 
    SET banner_picture = $2, description = $3, location = $4
    WHERE id = $1`,
    [id, banner_picture, description, location]
    );
};
const addUserProfileInfoC = (id,profile_picture, description, location ) => {
  return db.query(
    `UPDATE users 
    SET profile_picture = $2, description = $3, location = $4
    WHERE id = $1`,
    [id, profile_picture, description, location]
    );
};
const addUserProfileInfoD = (id,description, location ) => {
  return db.query(
    `UPDATE users 
    SET description = $2, location = $3
    WHERE id = $1`,
    [id, description, location]
    );
};

const checkUserDB = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getAllUsers, getUserById, addUser, checkUserDB, addUserProfileInfoA, addUserProfileInfoB, addUserProfileInfoC, addUserProfileInfoD };
