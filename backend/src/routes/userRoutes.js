const express = require("express");
const userController = require("../controllers/userController.js");
const userInterestController = require("../controllers/userInterestController.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.get("/logout", userController.Logout);
router.get("/:id", (req, res) =>
  userController.getUserById(req.params.id).then((user) => {
    res.send(user);
  })
);
router.get("/:id/common", (req,res) => {
  userInterestController.getUserInterestsById(req.params.id)
  .then((interests) => {
    let interestList = [];
    for (const interest of interests) {
      interestList.push(interest.interest_id);
    }
    return interestList;
  })
  .then((interests) => {
    let userCommon = [];
    for (const interest of interests) {
      userCommon.push(userController.checkCommonInterest(req.params.id, interest))
    }
    return Promise.all(userCommon, (result) => result)
  })
  .then((userCommon)=> {
    let finalCommonList = []; 
    for (const users of userCommon) {
      for (const user of users) {
        if (!finalCommonList.includes(user.user_id)) {
          finalCommonList.push(user.user_id);
        }
      }
    }
    return finalCommonList.sort();
  })
  .then((finalCommonList) => {
    let finalUserList = [];
    for (const user of finalCommonList) {
      finalUserList.push(userController.getUserById(user))
    }
    return Promise.all(finalUserList,(result) => result)
  })
  .then((finalUserList) => {
    res.send(finalUserList);
  })
})

router.post("/update", userController.addUserProfileInfo);
router.post("/login", userController.Login);

module.exports = router;
