import { connection } from "../db/db.js";

// Fonction pour récupérer la liste des utilisateurs
export default function getUsers(searchTerm) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM t_user";
    let queryParams = [];

    // Si il y a un terme de recherche dans la barre de recherche, ajoute le SQL ci-dessous à la requête
    if (searchTerm) {
      sql += " WHERE username LIKE ?";
      queryParams.push(`%${searchTerm}%`);
    }

    //Requête à la BD
    connection.query(sql, queryParams, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
