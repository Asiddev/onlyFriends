require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const interestRoutes = require("./routes/interestRoutes");
const userInterestRoutes = require("./routes/userInterestRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const app = express();

//middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//

//routes
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/user_interests", userInterestRoutes);
app.use("/api/conversations", conversationRoutes);
//

//Starting Feature
app.get("/", (req, res) => {
  res.send(
    "Option for pathway: /api/users  /api/matches  /api/interests  /api/user_interests"
  );
});

//server connection
app.listen(process.env.PORT || 8080, () => {
  console.log(
    "Succefully Starting Server : listening on port " + process.env.PORT
  );
});
//
