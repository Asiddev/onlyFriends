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

const addUserProfileInfo = (query, inputs) => {
  return db.query(query, inputs);
};

const checkUserDB = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0];
    });
};

const getUserCommon = (userId) => {
  return db
    .query(
      ` 
      SELECT * FROM users
      WHERE id IN (
        SELECT user_id FROM user_interests
        WHERE interest_id IN (
          SELECT interest_id FROM user_interests
          WHERE user_id IN (
            SELECT id FROM users
            WHERE id = $1
          )
        )
      ) 
      AND (id != $1)
      AND (SELECT location FROM users WHERE id = $1) LIKE users.location
      AND id NOT IN (
        SELECT user_liked FROM matches
        WHERE user_id = $1
        AND user_liked IN (
          SELECT user_id FROM user_interests
          WHERE interest_id IN (
            SELECT interest_id FROM user_interests
            WHERE user_id IN (
              SELECT id FROM users
              WHERE id =$1
            )
          )
        )
      )
  `,
      [userId]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  checkUserDB,
  addUserProfileInfo,
  getUserCommon,
};
