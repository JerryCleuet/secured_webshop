import jwt from "jsonwebtoken";

// Middleware pour vérifier la présence et la validité du token JWT
const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis les cookies
  const token = req.cookies.Token;

  // Si le token n'est pas présent, on retourne une erreur
  if (!token) {
    return res.status(401).json({
      message:
        "Accès non autorisé. Veuillez vous connecter sur la page /login.",
    });
  }
  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations de l'utilisateur décodées au req pour une utilisation ultérieure
    req.user = decoded;
    next(); // Passer à la route suivante si le token est valide
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
const adminMiddleware = (req, res, next) => {
  // Vérifier si isAdmin est égal à 1
  if (!req.user || req.user.isAdmin !== 1) {
    return res.redirect("/login"); // Redirige si non authentifié ou pas admin
  }
  next();
};

export { authMiddleware, adminMiddleware };
