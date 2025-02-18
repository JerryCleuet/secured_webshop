import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";

//const SECRET = "123745616345162";
//const SALT_ROUNDS = 10; // Niveau de sécurité du hash

// Inscription utilisateur
export const signup = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Vérification des champs
  if (!username || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  //Vérifie que les deux mdp soient les mêmes
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas." });
  }
  // Vérifier si l'utilisateur existe déjà
  const checkUserSql = "SELECT id FROM users WHERE username = ?";
  connection.query(checkUserSql, [username], (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: "Nom d'utilisateur déjà pris." });
    }

    // Hash du mot de passe
    /*bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) {
        console.error("Erreur lors du hashage du mot de passe:", err);
        return res.status(500).json({ message: "Erreur serveur." });
      }
*/
    // Insertion en base de données
    const insertUserSql =
      "INSERT INTO users (username, password) VALUES (?, ?)";
    connection.query(insertUserSql, [username, password], (err, results) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: "Erreur serveur." });
      }

      // Création du token JWT
      /*   const token = jwt.sign(
          { id: results.insertId, role: isAdmin ? "admin" : "user" },
          SECRET,
          { expiresIn: "1y" }
        );

        res
          .status(201)
          .json({ message: "Utilisateur créé avec succès.", token }); */
    });
  });
};
