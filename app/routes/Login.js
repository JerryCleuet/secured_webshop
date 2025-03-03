import express from "express";
import path from "path";
import { login, logout } from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render(path.join(process.cwd(), "view", "login.ejs"));
});

loginRouter.post("/sign", login);

loginRouter.post("/logout", logout);

export { loginRouter };
