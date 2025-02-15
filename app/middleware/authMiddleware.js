import jwt from 'jsonwebtoken';

// Middleware pour vérifier la présence et la validité du token JWT
const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis les cookies
  const token = req.cookies.token;

  // Si le token n'est pas présent, on retourne une erreur
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Veuillez vous connecter.' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations de l'utilisateur décodées au req pour une utilisation ultérieure
    req.user = decoded;
    next(); // Passer à la route suivante si le token est valide
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
const adminMiddleware = (req, res, next) => {
  // Vérifier si l'utilisateur est un administrateur (par exemple, en vérifiant un champ dans le token)
  if (req.user && req.user.role === 'admin') {
    next(); // Si l'utilisateur est un admin, continuer l'exécution de la route
  } else {
    return res.status(403).json({ message: 'Accès refusé. Vous devez être administrateur.' });
  }
};

export { authMiddleware, adminMiddleware };
