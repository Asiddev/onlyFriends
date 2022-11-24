const db = require('../db/connection.js');

const getAllUsers = (req, res) => {
  res.send("at all useres");
};

module.exports = {
  getAllUsers,
};
