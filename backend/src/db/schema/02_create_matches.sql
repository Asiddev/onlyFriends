DROP TABLE IF EXISTS matches CASCADE;
-- CREATE matches
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_liked INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match BOOLEAN NOT NULL DEFAULT FALSE,
  created_at timestamp default current_timestamp
);