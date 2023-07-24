const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const mongoDB = require("./db");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://64be3f26624b41449c66d82f--lucky-genie-099ba6.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const userRoutes = require("./routes/UserRoutes");
const displayRoutes = require("./routes/DisplayRoutes");
const orderRoutes = require("./routes/OrderRoutes");
app.use("/api/user", userRoutes);
app.use("/api/menu", displayRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json("Server connected successfully");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}.`);
});
