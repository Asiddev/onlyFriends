const userQueries = require("../db/queries/users");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const getUserById = (id) => {
  return userQueries.getUserById(id);
};

const getUserCommon = (id) => {
  return userQueries.getUserCommon(id);
};

const addUser = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    const { email, password, password_confirmation, name } = req.body;

    if (user) {
      return res.status(401).json("Email is taken");
    }

    if (password.length < 5) {
      return res.status(401).json("Password length less than 5");
    }

    if (password !== password_confirmation) {
      return res.status(401).json("Passwords do not match");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    userQueries.addUser(email, hash, name).then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    });

    return res.status(201).redirect("/");
  });
};

const addUserProfileInfo = (req, res) => {
  let query = `UPDATE users SET description = $1, location = $2`;
  let inputs = [req.body.description, req.body.location];
  if (req.body.profile_picture && req.body.banner_picture) {
    inputs.push(req.body.profile_picture);
    inputs.push(req.body.banner_picture);
    query += `,profile_picture = $3, banner_picture = $4 `;
  }
  if (req.body.profile_picture && !req.body.banner_picture) {
    inputs.push(req.body.profile_picture);
    query += `, profile_picture = $3 `;
  }
  if (!req.body.profile_picture && req.body.banner_picture) {
    inputs.push(req.body.banner_picture);
    query += `, banner_picture = $3 `;
  }
  query += `WHERE id = ${req.body.id};`;
  userQueries.addUserProfileInfo(query, inputs);
};

const Login = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    if (!user) {
      return res.status(401).json("No account with that email");
    }

    if (user && !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json("Invalid Authorization , Please try again ");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET
    );

    let { password, ...others } = user;

    res.cookie("access-token", token);

    console.log("token assigned");

    return res.status(200).json({
      status: "Login successful!",
      success: true,
      token: token,
      user: others,
    });

    //res.cookie("user" , token)
    // redirect dashboard --->
  });
};

const Logout = (req, res) => {
  return res
    .clearCookie("access-token")
    .status(200)
    .json("Succesfully logged out");
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserCommon,
  addUser,
  addUserProfileInfo,
  Login,
  Logout,
};
