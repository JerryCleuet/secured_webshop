//Login.js
import express from "express";
import path from "path";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view", "login.html"));
});

export { loginRouter };
