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

const getUserCommon = (id) => {
  return db.query(`
    SELECT * FROM users
    WHERE ((SELECT location as user_location FROM users WHERE id = $1) LIKE location)
    AND (id != $1);
  `,[id])
  .then((data) => {
    return data.rows
  })
}

const addUser = (email, password, name) => {
  return db.query(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;",
    [email, password, name]
  );
};

const addUserProfileInfo = (query, inputs ) => {
  return db.query(
    query,
    inputs
    );
};

const checkUserDB = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getAllUsers, getUserById, addUser, checkUserDB,  addUserProfileInfo, getUserCommon };
