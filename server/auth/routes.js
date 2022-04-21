require("dotenv").config();
const { Router } = require("express");

const authController = require("./authController");

const router = Router();

router.get("/user", authController.getUser);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put("/user", authController.editUserInfo);
router.delete("/user", authController.deleteUser);

module.exports = router;
