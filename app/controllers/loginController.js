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

    //Comparaison du mot de passe avec bcrypt
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
        // Envoie le token aux cookies
        res.cookie("Token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        // Envoie le username aux cookies
        res.cookie("username", user.username, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        //redirige sur la page admin si l'utilisateur loggé a la valeur 1 pour isAdmin
        if (user.isAdmin === 1) {
          return res.redirect("/adminAccount");
        }

        return res.redirect("/");
      } else {
        return res
          .status(401)
          .json({ message: "Mot de passe ou utilisateur incorrect." });
      }
    });
  });
};

//Déconnexion utilisateur
export const logout = (req, res) => {
  // Supprimer les cookies "Token" et "username"
  res.clearCookie("Token", {
    httpOnly: true,
    secure: true, // Assurez-vous que secure est défini comme dans la création du cookie
    sameSite: "none", // Assurez-vous que sameSite est le même que lors de la création du cookie
  });

  //Efface ce qu'il y a dans les cookies
  res.clearCookie("username", {
    httpOnly: true,
    secure: true, // Assurez-vous que secure est défini comme dans la création du cookie
    sameSite: "none", // Assurez-vous que sameSite est le même que lors de la création du cookie
  });

  // Réponse de déconnexion avec redirection
  res.redirect("/login");
};
