const db = require('../../configs/db.config');

const getAllMatches = () => {
	return db.query("SELECT * FROM matches;").then(data => {
		return data.rows;
	})
}

const getMatchById = id => {
	return db.query("SELECT * FROM matches; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllMatches, getMatchById}