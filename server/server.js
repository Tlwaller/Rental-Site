require("dotenv").config();
const express = require("express");
const session = require("express-session");
const rentalRoutes = require("./rentals/routes");
const authRoutes = require("./auth/routes");

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/api/v1", rentalRoutes);
app.use("/auth", authRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`app listening on port ${SERVER_PORT}`)
);
