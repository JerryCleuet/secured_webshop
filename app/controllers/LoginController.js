const path = require("path");

module.exports = {
  // Méthode pour traiter la soumission du formulaire de connexion
  login: (req, res) => {
    // Tu peux récupérer ici les informations du formulaire et vérifier les identifiants
    res.sendFile(path.join(process.cwd(), "./view", "login.html"));
  },
};
