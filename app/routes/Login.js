import express from "express";
import path from "path";
import { login } from "../controllers/authController.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view", "login.html"));
});

loginRouter.post("/", login);

export { loginRouter };
