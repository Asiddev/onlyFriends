require("dotenv").config();
const Express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = Express();

app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log(
    "Succefully Starting Server : listening on port " + process.env.PORT
  );
});
