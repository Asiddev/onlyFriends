const userQueries = require("../db/queries/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const getUserById = (id) => {
  return userQueries.getUserById(id)
};


const addUser = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    if (user) {
      return res.status(401).json("Email is taken");
    } else {
      if (req.body.password && req.body.password_confirmation) {
        if (!(req.body.password === req.body.password_confirmation)) {
          return res.status(401).json("Passwords do not match");
        } else {
          let saltRounds = 10;
          let salt = bcrypt.genSaltSync(saltRounds);
          let hash = bcrypt.hashSync(req.body.password, salt);

          userQueries
            .addUser(req.body.email, hash, req.body.name)
            .then((data) => {
              console.log(data.rows[0]);
              return data.rows[0];
            });
        }
      } else {
        return res
          .status(401)
          .json("Please enter a password and password Confirmation field");
      }
      console.log("going here");

      return res.status(201).redirect("/");
    }
  });
};

const addUserProfileInfo = (req, res) => {
  const body = req.body;
  if (!body.profile_picture && !body.banner_picture) {
    userQueries
    .addUserProfileInfoD(body.id, body.description, body.location)
  } else if (body.profile_picture && !body.banner_picture) {
    userQueries
    .addUserProfileInfoC(body.id, body.profile_picture, body.description, body.location)
  } else if (!body.profile_picture && body.banner_picture) {
    userQueries
    .addUserProfileInfoB(body.id, body.banner_picture, body.description, body.location)
  } else {
    userQueries
    .addUserProfileInfoA(body.id, body.profile_picture, body.banner_picture, body.description, body.location)
  } 
}

const Login = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    if (!user) {
      return res.status(401).json("No account with that email");
    }

    if (user && !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json("Invalid Autharization , Please try again ");
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
  addUser,
  addUserProfileInfo,
  Login,
  Logout,
};
