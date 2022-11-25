const db = require('../../configs/db.config');

const getAllInterests = () => {
	return db.query("SELECT * FROM interests;").then(data => {
		return data.rows;
	})
}

const getInterestById = id => {
	return db.query("SELECT * FROM interests; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllInterests, getInterestById}