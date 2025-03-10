function generateSalt(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}

async function hashPassword(password, salt) {
  let hash = 1;
  const combined = password + salt;

  for (let i = 0; i < combined.length; i++) {
    const charCode = combined.charCodeAt(i);
    hash = hash * 31 + charCode;
  }
  return Math.abs(hash).toString(16);
}

export { hashPassword, generateSalt };
