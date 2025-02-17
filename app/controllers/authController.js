// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = "123745616345162";
//const SALT_ROUNDS = 10;

// Connexion utilisateur
export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.log("erreur lors de la requête");
      return res.status(500).json({ message: "Erreur serveur." });
    }
    if (results.length === 0)
      return res.status(401).json({ message: "Utilisateur non trouvé." });

    const user = results[0];
    if (password !== user.password) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "1y",
    });
    res.json({ message: "Connexion réussie", token });
  });
};
// Inscription utilisateur (ADMIN UNIQUEMENT)
/*export const register = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) return res.status(500).json({ message: "Erreur serveur." });

    const sql = "INSERT INTO t_users (email, password, role) VALUES (?, ?, ?)";
    connection.query(sql, [email, hash, role], (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur." });
      res.status(201).json({ message: "Utilisateur créé avec succès." });
    });
  });
};*/
