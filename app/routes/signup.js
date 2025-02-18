import express from "express";
import path from "path";
import { signup } from "../controllers/signupController.js";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view", "signup.html"));
});

signupRouter.post("/", signup);

export { signupRouter };
