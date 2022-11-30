const db = require('../../configs/db.config');

const getAllUserInterests = () => {
	return db.query("SELECT * FROM user_interests;").then(data => {
		return data.rows;
	})
}

const getUserInterestById = (id) => {
	return db.query("SELECT * FROM user_interests; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

const addUserInterest = (userId, interestId) => {
	//Make a db query that puts the specific user logged in with just 1 interest'

	return db.query(`
		INSERT INTO user_interests 
		(user_id, interest_id) 
    SELECT $1,$2
		WHERE NOT EXISTS
      (SELECT user_id, interest_id
        FROM user_interests
        WHERE user_id = $1 AND interest_id = $2);
	`, [userId, interestId]).then(
		data => {
			return data.rows;
	})
}

const clearUserInterests = (userId) => {
  return db.query(`DELETE FROM user_interests WHERE user_id = $1`,[userId])
}

const getUserInterestsById = (id) => {
  return db.query(`
    SELECT * FROM interests
    JOIN user_interests 
    ON interests.id = interest_id 
    WHERE user_id = $1  
  `, [id]).then((data) => {
    return data.rows;
  })
}

const checkCommonInterest = (userId, interestId) => {
  return db.query(`
    SELECT user_id FROM user_interests
    WHERE (user_id != $1)
    AND (interest_id = $2);
    
  `,[userId, interestId]).then((data) => {
    return data.rows;
  })
}

module.exports = { getAllUserInterests, getUserInterestById, addUserInterest, getUserInterestsById, clearUserInterests, checkCommonInterest }

