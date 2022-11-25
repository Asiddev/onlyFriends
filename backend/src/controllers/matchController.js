const matchQueries = require('../db/queries/matches');

const getAllMatches = (req, res) => {
  matchQueries.getAllMatches()
  .then(matches => {
    res.send(matches);
  })
};

module.exports = {
  getAllMatches,
};
