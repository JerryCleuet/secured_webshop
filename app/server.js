import express from "express";
import https from "https";
import fs from "fs";
import { loginRouter } from "./routes/Login.js";
import path from "path";

const app = express();

// Options pour le serveur HTTPS
const options = {
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt"),
};

// Utiliser express.static pour servir les fichiers statiques du dossier public
const publicPath = path.join(process.cwd(), "app", "public");
app.use(express.static(publicPath));


// Routes
app.use("/account", (req, res) => {
  res.send("Account page");
});

app.use("/login", loginRouter);

// Démarrage du serveur HTTPS
https.createServer(options, app).listen(3333, () => {
  console.log("Serveur HTTPS lancé sur le port 3333");
});

