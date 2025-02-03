import express from "express";
const app = express();
import https from "https";
import fs from "fs";
import userRoute from "./routes/User.js";
import loginRoute from "./routes/Login.js";

const options = {
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt"),
};

app.use("/account", userRoute);
app.use("/login", loginRoute);

// Démarrage du serveur
https.createServer(options, app).listen(8080, () => {
  console.log("Serveur HTTPS lancé sur le port 8080");
});
