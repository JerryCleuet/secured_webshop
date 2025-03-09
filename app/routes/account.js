import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/adminAccountController.js";

const app = express();
app.use(cookieParser());

const accountRouter = express.Router();
const adminAccountRouter = express.Router();

accountRouter.get("/", authMiddleware, (req, res) => {
  const username = req.cookies.username || ""; // Récupérer le nom d'utilisateur à partir des cookies
  res.render(path.join(process.cwd(), "view", "account.ejs"), {
    username: username,
  });
});

/*
adminAccountRouter.get("/users", getUsers);*/

adminAccountRouter.get("/", authMiddleware, adminMiddleware, getUsers);

export { accountRouter, adminAccountRouter };
