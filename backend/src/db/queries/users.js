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

const addUserProfileInfo = (id, profile_picture, banner_picture, description, location ) => {
  return db.query(
    `UPDATE users 
    SET profile_picture = $2, banner_picture = $3, description = $4, location = $5
    WHERE id = $1`,
    [id, profile_picture, banner_picture, description, location]
    );
};

const checkUserDB = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getAllUsers, getUserById, addUser, checkUserDB, addUserProfileInfo };
