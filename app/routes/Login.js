const express = require("express");
const router = express.Router();
const controller = require("../controllers/LoginController");

router.get("/", controller.login);

module.exports = router;
