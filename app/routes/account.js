import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
import getUsers from "../controllers/adminAccountController.js";

const app = express();
app.use(cookieParser());

const accountRouter = express.Router();
const adminAccountRouter = express.Router();

//Route pour afficher la page account
accountRouter.get("/", authMiddleware, (req, res) => {
  const username = req.cookies.username || "";
  res.render(path.join(process.cwd(), "view", "account.ejs"), {
    username: username,
  });
});

//Route pour afficher la page admin
adminAccountRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  /*getUsers*/ (req, res) => {
    const username = req.cookies.username || "";
    res.render(path.join(process.cwd(), "view", "adminAccount.ejs"), {
      username: username,
      users: [""],
    });
  }
);

//Route pour afficher la liste des utilisateurs
adminAccountRouter.post(
  "/search",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const username = req.cookies.username || "";
    const search = req.body.search;

    // Attendre que getUsers renvoie les résultats
    const results = await getUsers(search);
    res.render(path.join(process.cwd(), "view", "adminAccount.ejs"), {
      username: username,
      users: results,
    });
  }
);
export { accountRouter, adminAccountRouter };
