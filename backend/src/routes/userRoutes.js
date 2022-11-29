const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.get("/logout", userController.Logout);
router.get("/:id", (req, res) =>
  userController.getUserById(req.params.id).then((user) => {
    res.send(user);
  })
);
router.post("/update", userController.addUserProfileInfo);
router.post("/login", userController.Login);

module.exports = router;
