const matchQueries = require('../db/queries/matches');

const getAllMatches = (req, res) => {
  matchQueries.getAllMatches()
  .then(matches => {
    res.send(matches);
  })
};

const addMatches = (req, res) => {
  const {user_id, user_liked} = req.body;
  matchQueries.addMatches(user_id, user_liked)
}

module.exports = {
  getAllMatches,
  addMatches,
};
