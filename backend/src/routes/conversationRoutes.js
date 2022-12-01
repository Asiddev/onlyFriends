const express = require("express");
const conversationController = require("../controllers/conversationController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("conversations");
});
router.post("/", conversationController.startConversation);

module.exports = router;
