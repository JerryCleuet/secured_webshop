// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";
import exp from "constants";

const SECRET = "123745616345162";

// Connexion utilisateur
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.log("erreur lors de la requête");
      return res.status(500).json({ message: "Erreur serveur." });
    }
    if (results.length === 0)
      return res
        .status(401)
        .json({ message: "Mot de passe ou utilisateur incorrect." });

    const user = results[0];

    console.log("user", user.password);

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: user.id, role: user.role, username: user.username },
          SECRET,
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
        console.log("token", token);

        return res.redirect("/");
      } else {
        return res
          .status(401)
          .json({ message: "Mot de passe ou utilisateur incorrect." });
      }
    });
  });
};

export const logout = (req, res) => {
  console.log("aa");
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};
