const userInterestQueries = require('../db/queries/userInterests');

const getAllUserInterests = (req, res) => {
  userInterestQueries.getAllUserInterests()
  .then(interests => {
    res.send(interests);
  })
};

module.exports = {
  getAllUserInterests,
};
