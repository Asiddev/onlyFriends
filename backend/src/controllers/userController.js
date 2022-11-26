const userQueries = require("../db/queries/users");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const addUser = (req, res) => {
  //set cookie
  //encryption
  //hash password

  userQueries.addUser(req.body.email, req.body.password).then((data) => {
    console.log("added user!");
    console.log(data.rows[0]);
  });
};

module.exports = {
  getAllUsers,
  addUser,
};
