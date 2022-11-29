DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT 'https://firebasestorage.googleapis.com/v0/b/lhl-finals-41149.appspot.com/o/Default%20Pictures%2Fdefault_profile_picture.jpg?alt=media&token=c2fd132d-9146-4e52-948b-a7b8b077b9e0',
  banner_picture VARCHAR(255) DEFAULT 'https://firebasestorage.googleapis.com/v0/b/lhl-finals-41149.appspot.com/o/Default%20Pictures%2Fdefault_banner_picture.jpg?alt=media&token=9c9d2102-9d81-411e-8ffc-0d31d9988af4',
  description VARCHAR(100),
  location VARCHAR(255),
  created_at timestamp default current_timestamp
);