// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";

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
    if (password !== user.password) {
      return res
        .status(401)
        .json({ message: "Mot de passe ou utilisateur incorrect." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "1y",
    });
    res.json({ message: "Connexion réussie", token });
  });
};
// Inscription utilisateur (ADMIN UNIQUEMENT)
/*export const register = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) return res.status(500).json({ message: "Erreur serveur." });

    const sql = "INSERT INTO t_users (username, password, isAdmin) VALUES (?, ?, ?)";
    connection.query(sql, [username, hash, role], (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur." });
      res.status(201).json({ message: "Utilisateur créé avec succès." });
    });
  });
};*/
