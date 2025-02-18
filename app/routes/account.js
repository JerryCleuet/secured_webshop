import express from "express";
import path from "path";

const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view", "account.html"));
});

export { accountRouter };
