const userQueries = require("../db/queries/users");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const addUser = (req, res) => {
  let saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(req.body.password, salt);

  // bcrypt.compare(req.body.password, hash).then((result) => console.log(result));

  //set cookie
  //encryption
  //hash password

  userQueries.addUser(req.body.email, hash).then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  });
  return res.status(201).redirect("/");
};

module.exports = {
  getAllUsers,
  addUser,
};
