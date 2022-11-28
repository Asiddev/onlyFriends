const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.get("/:id", (req,res) => userController.getUserById(req.params.id).then((user) => {res.send(user)}))
router.post("/update", userController.addUserProfileInfo);
router.post("/login", userController.Login);
router.get("/logout", userController.Logout);

module.exports = router;
