# OnlyFriends 

Created by [Alex Sidor](https://github.com/Asiddev), [Kevin Lee](https://github.com/jhssttj), and [Nico Hernandez](https://github.com/nicohsfu)

OnlyFriends is an online geosocial networking application utilizing the PERN stack to align people with similar interesting and hobbies. Be a part of a vast community of people looking to find people that love to spend time off the same way you do!

## Tech Stack
- PostgreSQL
- Express
- React
- Node
- Firebase
- Google Maps Platform

## Demos

### The main "browse" page
![description](https://github.com/Asiddev/onlyFriends/blob/main/planning/docs/browse.gif?raw=true)

### Profile setup page
![description](https://github.com/Asiddev/onlyFriends/blob/main/planning/docs/profilesetup.gif?raw=true)

### Matches page
![description](https://github.com/Asiddev/onlyFriends/blob/main/planning/docs/matches.gif?raw=true)

### Direct messaging page
![description]()

### Register page (with error handling)
![description](https://github.com/Asiddev/onlyFriends/blob/main/planning/docs/register.gif?raw=true)

### Login page (with error handling)
![description](https://github.com/Asiddev/onlyFriends/blob/main/planning/docs/login.gif?raw=true)

## Setup
- On your terminal, clone the repo via `git clone git@github.com:Asiddev/onlyFriends.git`
- On your preferred code editor, open the root project folder, i.e. the main `onlyFriends` folder
  - duplicate the `.env.example` file located in `onlyFriends/backend/src`, then remove `.example` from its filename
    - in this newly-created `.env` file, provide the variables with relevant values
    - save your changes
  - duplicate the **other** `.env.example` file located in `onlyFriends/frontend`, then remove `.example` from its filename
    - in this newly-created `.env` file, provide the variables with relevant values
    - The `.env` file requires API from Firebase and Google Maps Platform. An account must be made to generate new API keys for both before the application can run properly.
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
- For Backend
  - bcrypt
  - body-parser
  - cookie-parser
  - cors
  - dotenv
  - express
  - jsonwebtoken
  - morgan
  - nodemon
  - pg
- For Frontend
  - axios
  - dotenv
  - env-cmd
  - firebase
  - google-map-react
  - mui
  - react
  - react-cookie
  - react-dom
  - react-file-reader
  - react-google-autocomplete
  - react-router-dom
  - react-scripts
  - sass
  - timeago-react
  - uuid
  - web-vitals
