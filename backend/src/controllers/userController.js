const userQueries = require('../db/queries/users');

const getAllUsers = (req, res) => {
  userQueries.getAllUsers()
  .then(users => {
    console.log(users);
    res.send(users);
  })
};

module.exports = {
  getAllUsers,
};
