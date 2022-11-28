DROP TABLE IF EXISTS user_interests CASCADE;
-- CREATE INTERESTS
CREATE TABLE user_interests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  interest_id INTEGER REFERENCES interests(id) ON DELETE CASCADE,
  created_at timestamp default current_timestamp
);