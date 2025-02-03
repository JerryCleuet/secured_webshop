console.log("démarrage");
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const userRoute = require("./routes/User");
const loginRoute = require("./routes/Login");
const options = {
  key: fs.readFileSync("private.key"), // Chemin vers ta clé privée
  cert: fs.readFileSync("certificate.crt"),
};
console.log(options.key);

app.use("/account", userRoute);
app.use("/login", loginRoute);

// Démarrage du serveur
https.createServer(options, app).listen(8080, () => {
  console.log("Serveur HTTPS lancé sur le port 8080");
});
