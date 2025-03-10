import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";

// Connexion utilisateur
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const sql = "SELECT * FROM t_user WHERE username = ?";
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.log("Erreur lors de la requête");
      return res.status(500).json({ message: "Erreur serveur." });
    }
    if (results.length === 0)
      return res
        .status(401)
        .json({ message: "Mot de passe ou utilisateur incorrect." });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.cookie("username", user.username, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        // Redirection basée sur isAdmin
        if (user.isAdmin === 1) {
          return res.redirect("/adminAccount");
        }

        return res.redirect("/"); // Redirection vers la page compte utilisateur
      } else {
        return res
          .status(401)
          .json({ message: "Mot de passe ou utilisateur incorrect." });
      }
    });
  });
};

export const logout = (req, res) => {
  // Supprimer les cookies "Token" et "username"
  res.clearCookie("Token", {
    httpOnly: true,
    secure: true, // Assurez-vous que secure est défini comme dans la création du cookie
    sameSite: "none", // Assurez-vous que sameSite est le même que lors de la création du cookie
  });

  res.clearCookie("username", {
    httpOnly: true,
    secure: true, // Assurez-vous que secure est défini comme dans la création du cookie
    sameSite: "none", // Assurez-vous que sameSite est le même que lors de la création du cookie
  });

  // Réponse de déconnexion avec redirection
  res.status(200).json({ message: "Déconnexion réussie", redirect: "/login" });
};
