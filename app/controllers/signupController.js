import bcrypt from "bcrypt";
import { connection } from "../db/db.js";
import { generateSalt, hashPassword } from "../middleware/hashMiddleware.js";
let manualHashChoice = false;
export const signup = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas." });
  }

  const checkUserSql = "SELECT id FROM t_user WHERE username = ?";
  connection.query(checkUserSql, [username], async (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Nom d'utilisateur déjà pris." });
    }

    let hashedPassword;

    if (manualHashChoice) {
      const salt = generateSalt(10);
      hashedPassword = hashPassword(password, salt);
    } else {
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        console.error("Erreur lors du hashage bcrypt:", err);
        return res.status(500).json({ message: "Erreur serveur." });
      }
    }

    const insertUserSql =
      "INSERT INTO t_user (username, password) VALUES (?, ?)";
    connection.query(insertUserSql, [username, hashedPassword], (err) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: "Erreur serveur." });
      }
      return res.redirect("/login");
    });
  });
};
