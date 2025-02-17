import express from "express";
import https from "https";
import fs from "fs";
import { loginRouter } from "./routes/Login.js";
import path from "path";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

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

app.use("/", loginRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Démarrage du serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log("Serveur HTTPS lancé sur le port " + port);
});

