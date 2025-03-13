import mysql from "mysql2";

// Crée une connexion avec la base de données
const connection = mysql.createConnection({
  host: "localhost", // ou l'adresse IP de ton conteneur Docker si la DB est dans Docker
  user: "root", // Utilisateur de la base de données
  password: "root", // Mot de passe de l'utilisateur MySQL
  database: "db_users", // Nom de la base de données
  port: 6033, // Port MySQL
});

// Vérifie la connexion
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion : " + err.stack);
    return;
  }
  console.log(
    "Connecté à la base de données MySQL avec l'ID " + connection.threadId
  );
});

export { connection };
