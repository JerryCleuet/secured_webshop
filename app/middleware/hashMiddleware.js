// Générateur de sel
function generateSalt(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}

// Hacheur de mots de passe
function hashPassword(password, salt) {
  let hash = 1;
  const combined = password + salt;

  for (let i = 0; i < combined.length; i++) {
    const charCode = combined.charCodeAt(i); // CharCodeAt utilisé pour passer en UTF16 les caractères (UTF16 très proche de ASCII)
    hash = hash * 31 + charCode; // Ici, 31 utilisé car c'est un nombre premier assez élevé => ne retournera pas de hash similaires
  }
  return Math.abs(hash).toString(16); // Retourner la valeur absolue pour toujours être en nombre positif
}

export { hashPassword, generateSalt };
