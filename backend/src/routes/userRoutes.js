const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.post("/login", userController.Login);
router.get("/logout", userController.Logout);

module.exports = router;
