const userInterestQueries = require('../db/queries/userInterests');

const getAllUserInterests = (req, res) => {
  userInterestQueries.getAllUserInterests()
    .then(interests => {
      res.send(interests);
    })
};

const updateUserInterests = (req, res) => {

  const body = req.body
  //Initially clear interest
  userInterestQueries.clearUserInterests(body.id)
  .then(() => {
    //Reupdate interest based on updates
    for (let interest of body.interests) {
      userInterestQueries.addUserInterest(body.id, interest)
    }
  })
}

const getUserInterestsById = (id) => {
  return userInterestQueries.getUserInterestsById(id)
};

module.exports = {
  getAllUserInterests,
  updateUserInterests,
  getUserInterestsById,
};



