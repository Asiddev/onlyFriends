const userQueries = require("../db/queries/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const addUser = (req, res) => {
  console.log(req.body);
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

          userQueries.addUser(req.body.email, hash, req.body.name).then((data) => {
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

const Login = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    if (!user) {
      return res.status(401).json("No account with that email");
    }

    if (user && !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json("Invalid Autharization , Please try again ");
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    res.cookie("access-token", token);

    console.log("token assigned");

    return res.status(200).json({
      status: "Login successful!",
      success: true,
      token: token,
    });

    //res.cookie("user" , token)
    // redirect dashboard --->
  });
};

module.exports = {
  getAllUsers,
  addUser,
  Login,
};

// bcrypt.compare(req.body.password, user.password).then((result) => {
//   if (result) {
//     console.log(
//       "password  and email correct , give user a cookie to store"
//     );
//   } else {
//     return res.status(403).send("Invalid password or email");
//   }
