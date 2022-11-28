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
		(user_id, interest_id) VALUES ($1, $2) 
		RETURNING *;
	`, [userId, interestId]).then(
		data => {
			return data.rows;
	})
}

module.exports = { getAllUserInterests, getUserInterestById, addUserInterest }

