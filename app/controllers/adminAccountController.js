import { connection } from "../db/db.js";

export default function getUsers(searchTerm) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM t_user";
    let queryParams = [];

    if (searchTerm) {
      sql += " WHERE username LIKE ?";
      queryParams.push(`%${searchTerm}%`);
    }

    connection.query(sql, queryParams, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
