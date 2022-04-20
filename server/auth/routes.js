require("dotenv").config();
const { Router } = require("express");
const session = require("express-session");

const authController = require("./authController");

const router = Router();
const { SESSION_SECRET } = process.env;

router.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

router.get("/user", authController.getUser);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
