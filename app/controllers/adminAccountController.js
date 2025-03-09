import { connection } from "../db/db.js";

const getUsers = (req, res) => {
  const { searchTerm } = req.query;
  let sql = "SELECT * FROM t_user";
  let queryParams = [];

  if (searchTerm) {
    sql += " WHERE username LIKE ?";
    queryParams.push(`%${searchTerm}%`);
  }

  connection.query(sql, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send("Erreur serveur");
    }
    // Rendu de la vue avec les utilisateurs et le terme de recherche
    res.render("adminAccount.ejs", {
      users: results,
      searchTerm: searchTerm || "",
    });
  });
};

export { getUsers };
