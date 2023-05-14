import forge from 'node-forge';

// Function to generate a random DES key
function generateDESKey() {
  return forge.random.getBytesSync(8);
}

// Function to encrypt data using DES key
function encryptDES(data, desKey) {
  const cipher = forge.cipher.createCipher('DES-ECB', forge.util.createBuffer(desKey));
  cipher.start();
  cipher.update(forge.util.createBuffer(data, 'utf8'));
  cipher.finish();
  return forge.util.encode64(cipher.output.getBytes());
}

// Function to decrypt data using DES key
function decryptDES(data, desKey) {
  const cipher = forge.cipher.createDecipher('DES-ECB', forge.util.createBuffer(desKey));
  cipher.start();
  cipher.update(forge.util.createBuffer(forge.util.decode64(data)));
  cipher.finish();
  return cipher.output.toString('utf8');
}

export { generateDESKey, encryptDES, decryptDES };
