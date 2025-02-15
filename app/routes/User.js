import express from "express";

const router = express.Router();

router.get("/account", (req, res) => {
    res.sendFile(path.join(process.cwd(), "view", "account.html"));
  });

export { router };

