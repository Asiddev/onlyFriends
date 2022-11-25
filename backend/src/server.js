require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//

//routes
app.use("/api/users", userRoutes);
//

//Starting Feature
app.get("/", (req, res) => {
  res.json({ greetings: "hello world" });
});

//server connection
app.listen(process.env.PORT || 8080, () => {
  console.log(
    "Succefully Starting Server : listening on port " + process.env.PORT
  );
});
//
