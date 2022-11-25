DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  banner_picture VARCHAR(255),
  description TEXT(100),
  location VARCHAR(255),
  created_at DATE NOT NULL,
);