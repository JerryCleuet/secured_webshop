import express from "express";

const accountRouter = express.Router();

accountRouter.get("/account", (req, res) => {
    res.sendFile(path.join(process.cwd(), "view", "account.html"));
  });

export { accountRouter };

