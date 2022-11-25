const db = require('../../configs/db.config');

const getAllUserInterests = () => {
	return db.query("SELECT * FROM user_interests;").then(data => {
		return data.rows;
	})
}

const getUserInterestById = id => {
	return db.query("SELECT * FROM user_interests; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllUserInterests, getUserInterestById}