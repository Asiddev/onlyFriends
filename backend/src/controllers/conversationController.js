const userQueries = require("../db/queries/users");

const startConversation = (id, userId) => {
  return userQueries.startConversation(id, userId);
};

module.exports = {
  startConversation,
};
