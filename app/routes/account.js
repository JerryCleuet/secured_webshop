import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

const accountRouter = express.Router();
const adminAccountRouter = express.Router();

accountRouter.get("/", (req, res) => {
  const username = req.cookies.username || ""; // Récupérer le nom d'utilisateur à partir des cookies
  console.log(username);
  res.render(path.join(process.cwd(), "view", "account.ejs"), {
    username: username,
  });
});

adminAccountRouter.get("/adminAccount", (req, res) => {
  res.render(path.join(process.cwd(), "view", "adminAccount.ejs"));
});

export { accountRouter, adminAccountRouter };
