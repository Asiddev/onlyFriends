# OnlyFriends 

by Alex Sidor, Kevin Lee, and Nico Hernandez

### OnlyFriends is an online networking application utilizing the PERN stack to align people with similar interesting and hobbies. Be a part of a vast community of people looking to find people that love to spend time off the same way you do!

#

## Tech Stack
- PostgreSQL
- Express
- React
- Node

## Setup
- On your terminal, clone the repo via `git clone git@github.com:Asiddev/onlyFriends.git`
- On your preferred code editor, open the root project folder, i.e. the main `onlyFriends` folder
  - duplicate the `.env.example` file located in `onlyFriends/backend/src`, then remove `.example` from its filename
    - in this newly-created `.env` file, provide the variables with relevant values
    - save your changes
  - duplicate the `.env.example` file located in `onlyFriends/frontend`, then remove `.example` from its filename
    - in this newly-created `.env` file, provide the variables with relevant values
    - save your changes
- On your terminal, navigate to `onlyFriends/backend/src`
  - then `npm i`
  - then `npm run db:reset`
  - and finally `npm start`
- On a **separate** terminal, navigate to `onlyFriends/frontend`
  - then `npm i`
  - then `npm start`
- Keep the 2 terminals up and running
- On your browser, navigate to `http://localhost:3000/` and start exploring the app!

## Dependencies
- 