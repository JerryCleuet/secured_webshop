import express from "express";
import path from "path";
import { signup } from "../controllers/signupController.js";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render(path.join(process.cwd(), "view", "signup.ejs"));
});

signupRouter.post("/", signup);

export { signupRouter };
