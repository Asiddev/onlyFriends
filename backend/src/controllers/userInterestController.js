const userInterestQueries = require('../db/queries/userInterests');

const getAllUserInterests = (req, res) => {
  userInterestQueries.getAllUserInterests()
    .then(interests => {
      res.send(interests);
    })
};

const addUserInterests = (req, res) => {
  //req.body.interest = [Array of interest]
  // Db query takes only 1 interest and puts into db.

  //with each interest use query.
  const body = req.body
  
  for (let interest of body.interests) {
    userInterestQueries.addUserInterest(body.id, interest)
  }
}

module.exports = {
  getAllUserInterests,
  addUserInterests
};
