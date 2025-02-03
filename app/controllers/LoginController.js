import express from "express";
import jwt from "jsonwebtoken";
import path from "path";

const loginRouter = express.Router(); // Utilisation de Router() au lieu de express()

// Route pour afficher la page de login
loginRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "view", "login.html"));
});

// Route pour traiter le login
loginRouter.post("/", (req, res) => {
  // Fais l'équivalent d'une comparaison de mot de passe avec bcrypt mais sans bcrypt
  if (req.body.username === "admin" && req.body.password === "admin") {
    // Crée un token JWT avec les informations utilisateur
    const token = jwt.sign({ username: req.body.username }, "secret");

    // Ajoute le token dans un cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Redirige vers le tableau de bord / compte
    res.redirect("/account");
  } else {
    // Redirige vers la page de login si les identifiants sont incorrects
    res.redirect("/login");
  }
});

export { loginRouter };
