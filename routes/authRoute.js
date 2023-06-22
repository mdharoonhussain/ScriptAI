const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

//Router Object

const router = express.Router()

//Routes
// For Registration
router.post("/register", registerController);

// For Login
router.post("/login", loginController);

// For Logout
router.post("/logout", logoutController);

module.exports = router;
