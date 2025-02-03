import path from "path";
import { Router } from "express";
import { account } from "../controllers/UserController.js";
const account = Router();
// Route pour afficher la page de compte
account.get(req, (res) => {
  res.sendFile(path.join(process.cwd(), "view", "account.html"));
});
export { account };
