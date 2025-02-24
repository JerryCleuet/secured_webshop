import express from "express";
import https from "https";
import fs from "fs";
import { loginRouter } from "./routes/login.js";
import { signupRouter } from "./routes/signup.js";
import { accountRouter } from "./routes/account.js";
import path from "path";
import cors from "cors";
import cookie from "cookie-parser";

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour les formulaires classiques
app.use(cors());
app.use(cookie());

// Options pour le serveur HTTPS
const options = {
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt"),
};

// Utiliser express.static pour servir les fichiers statiques du dossier public
const publicPath = path.join(process.cwd(), "app", "public");
app.use(express.static(publicPath));

// Routes

app.use("/", loginRouter);

app.use("/signup", signupRouter);

app.use("/account", accountRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Démarrage du serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log("Serveur HTTPS lancé sur le port " + port);
});
