import express from "express";
const router = express.Router();
import controller from "../controllers/LoginController.js";

router.get("/", controller.login);
router.post("/", controller.login);

export { router };
