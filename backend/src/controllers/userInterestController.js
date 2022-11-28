const userInterestQueries = require('../db/queries/userInterests');

const getAllUserInterests = (req, res) => {
  userInterestQueries.getAllUserInterests()
    .then(interests => {
      res.send(interests);
    })
};

const addUserInterests = (req, res) => {

  const body = req.body
  
  for (let interest of body.interests) {
    userInterestQueries.addUserInterest(body.id, interest)
  }
}

const getUserInterestsById = (id) => {
  return userInterestQueries.getUserInterestsById(id)
};

module.exports = {
  getAllUserInterests,
  addUserInterests,
  getUserInterestsById
};



