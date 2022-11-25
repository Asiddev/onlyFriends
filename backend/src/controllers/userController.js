const userQueries = require('../db/queries/users');

const getAllUsers = (req, res) => {
  userQueries.getAllUsers()
  .then(users => {
    res.send(users);
  })
};

module.exports = {
  getAllUsers,
};
