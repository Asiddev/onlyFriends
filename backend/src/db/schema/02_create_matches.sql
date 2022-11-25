DROP TABLE IF EXISTS matches CASCADE;
-- CREATE matches
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_liked INTEGER NOT NULL,
  match BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL DEFAULT created_at,
);