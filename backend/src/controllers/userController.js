const userQueries = require("../db/queries/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  userQueries.getAllUsers().then((users) => {
    res.send(users);
  });
};

const addUser = (req, res) => {
  userQueries.checkUserDB(req.body.email).then((user) => {
    if (user) {
      console.log(user);
      return res.status(401).json("Email is taken");
    } else {
      console.log("going here");
      let saltRounds = 10;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(req.body.password, salt);

      //set cookie
      //encryption
      //hash password

      userQueries.addUser(req.body.email, hash).then((data) => {
        console.log(data.rows[0]);
        return data.rows[0];
      });
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
