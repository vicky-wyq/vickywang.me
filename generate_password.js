const CryptoJS = require("crypto-js");

// Get plaintext and password from command line arguments
const args = process.argv.slice(2);
let plaintext = '';
let password = '';

while (args.length > 0) {
  const flag = args.shift();
  if (flag === '-url') {
    plaintext = args.shift();
  } else if (flag === '-password') {
    password = args.shift();
  }
}

if (!plaintext || !password) {
  console.log("Usage: node generate_password.js -url [plaintext] -password [password]");
  process.exit(1);
}

// Encrypt the string
const encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();

console.log("Encrypted:", encrypted);

// Decrypt the string
const decryptedBytes = CryptoJS.AES.decrypt(encrypted, password);
const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);

console.log("Decrypted:", decrypted);