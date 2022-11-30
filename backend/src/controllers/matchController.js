const matchQueries = require('../db/queries/matches');

const getAllMatches = (req, res) => {
  matchQueries.getAllMatches()
  .then(matches => {
    res.send(matches);
  })
};

const getUserMatch = (id) => {
  return matchQueries.getUserMatch(id);
};

const acceptMatches = (req, res) => {
  const {user_id, user_liked} = req.body;
  matchQueries.clearMatches(user_id, user_liked)
  .then(() => {
    matchQueries.acceptMatches(user_id, user_liked)
  })
}

const declineMatches = (req, res) => {
  const {user_id, user_liked} = req.body;
  matchQueries.clearMatches(user_id, user_liked)
  .then(() => {
    matchQueries.declineMatches(user_id, user_liked)
  })
}

module.exports = {
  getAllMatches,
  acceptMatches,
  declineMatches,
  getUserMatch
};
