const interestQueries = require("../db/queries/interests");

const getAllInterests = (req, res) => {
  interestQueries.getAllInterests().then((interests) => {
    res.send(interests);
  });
};

module.exports = {
  getAllInterests,
};
