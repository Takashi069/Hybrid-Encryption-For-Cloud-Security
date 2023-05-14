import forge from 'node-forge';

// Function to generate RSA key pair
function generateRSAKeyPair() {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

  return {
    publicKey: publicKeyPem,
    privateKey: privateKeyPem,
  };
}

// Function to encrypt data using RSA public key
function encryptRSA(data, publicKey) {
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObj.encrypt(data, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
}

// Function to decrypt data using RSA private key
function decryptRSA(data, privateKey) {
  const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
  const encrypted = forge.util.decode64(data);
  const decrypted = privateKeyObj.decrypt(encrypted, 'RSA-OAEP');
  return decrypted;
}

export { generateRSAKeyPair, encryptRSA, decryptRSA };
