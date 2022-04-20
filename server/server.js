require("dotenv").config();
const express = require("express");
const session = require("express-session");
const rentalRoutes = require("./rentals/routes");
const authRoutes = require("./auth/routes");

const app = express();

const { SERVER_PORT } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", rentalRoutes);
app.use("/auth", authRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`app listening on port ${SERVER_PORT}`)
);
