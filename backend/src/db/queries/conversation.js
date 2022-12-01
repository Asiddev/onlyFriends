const db = require("../../configs/db.config");

const startConversation = (sender_id, receiver_id, message) => {
  return db.query(
    "INSERT INTO conversations (sender_id, receiver_id,message) VALUES ($1, $2, $3) RETURNING *;",
    [sender_id, receiver_id, message]
  );
};

module.exports = { startConversation };
