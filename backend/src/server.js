require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
//

//routes
app.use("/api/users", userRoutes);
//

//server connection
app.listen(process.env.PORT || 8800, () => {
  console.log(
    "Succefully Starting Server : listening on port " + process.env.PORT
  );
});
//
