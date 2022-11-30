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
    let final = [];
    for (const interest of interests) {
      final.push(userInterestController.checkCommonInterest(req.params.id, interest)
    )}

    console.log('row 30',final)
    return Promise.all(final, (result) => {console.log("row 35,",result)})
  })
  .then((data)=> {
    console.log("final", data);
  })
 
})

router.post("/update", userController.addUserProfileInfo);
router.post("/login", userController.Login);

module.exports = router;
