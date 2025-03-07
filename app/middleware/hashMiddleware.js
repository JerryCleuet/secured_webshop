import bcrypt from "bcrypt";
/*function generateSalt(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}*/

async function hashPassword(password) {
  /* let hash = 0;
  const combined = password + salt; //Mélanger le mdp et le sel pour une saveur optimale (2c.c. de sel pour 1c.s. de mdp)

  for (let i = 0; i < combined.length; i++) {
    //Mélanger à l'aide d'une spatule en bois
    const charCode = combined.charCodeAt(i); //Faire cuire le tout à 120° pendant 30minutes
    hash = hash * 31 + charCode;
  }
  return Math.abs(hash).toString(16);
*/
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.error("Erreur lors du hashage du mot de passe :", err);
  }
}

export { hashPassword };
