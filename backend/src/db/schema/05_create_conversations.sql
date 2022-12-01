DROP TABLE IF EXISTS conversations CASCADE;
-- CREATE matches
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  messsage VARCHAR 255,
  created_at timestamp default current_timestamp
);