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

const acceptMatches = (userId, userLiked) => {
  return db.query(`
    INSERT INTO matches
    (user_id, user_liked, match)
    SELECT $1,$2,true
    WHERE NOT EXISTS
      (SELECT user_id, user_liked
        FROM matches
        WHERE user_id = $1 AND user_liked = $2);
  `,[userId, userLiked])
  .then((data) => data.rows)
}

const declineMatches = (userId, userLiked) => {
  return db.query(`
    INSERT INTO matches
    (user_id, user_liked, match)
    VALUES ($1,$2,false)
  `,[userId, userLiked])
  .then((data => data.rows))
}

const clearMatches = (userId, userLiked) => {
  return db.query(`
    DELETE FROM matches
    WHERE user_id = $1
    AND user_liked = $2
  `, [userId, userLiked])
}

const getUserMatch = (userId) => {
  return db
    .query(` 
    SELECT * FROM users
      WHERE id IN(
      SELECT user_id FROM matches
      WHERE user_id IN
          (SELECT user_liked FROM matches
          WHERE user_id = $1 
          AND match = true)
      AND user_liked = $1
      AND match = true)
  `,
      [userId]
    )
    .then((data) => {
      return data.rows;
    });
};
module.exports = {getAllMatches, getMatchById, acceptMatches, declineMatches, clearMatches, getUserMatch}