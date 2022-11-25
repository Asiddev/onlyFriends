const interestQueries = require('../db/queries/interests');

const getAllInterests = (req, res) => {
  interestQueries.getAllInterests()
  .then(matches => {
    res.send(matches);
  })
};

module.exports = {
  getAllInterests,
};
