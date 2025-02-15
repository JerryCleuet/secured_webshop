// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// Connexion utilisateur
export const login = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    
    const sql = "SELECT * FROM t_users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur." });
        if (results.length === 0) return res.status(401).json({ message: "Utilisateur non trouvé." });
        
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Erreur serveur." });
            if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect." });
            
            const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
            res.json({ message: "Connexion réussie", token });
        });
    });
};

// Inscription utilisateur (ADMIN UNIQUEMENT)
export const register = (req, res) => {
    const { username, password, role } = req.body;
    
    if (!username || !password || !role) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err) return res.status(500).json({ message: "Erreur serveur." });
        
        const sql = "INSERT INTO t_users (username, password, role) VALUES (?, ?, ?)";
        db.query(sql, [username, hash, role], (err, results) => {
            if (err) return res.status(500).json({ message: "Erreur serveur." });
            res.status(201).json({ message: "Utilisateur créé avec succès." });
        });
    });
};
