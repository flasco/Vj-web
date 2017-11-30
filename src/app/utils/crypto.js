import crypto from 'crypto';

export async function cipher(algorithm, key,buf) {
  if(buf.length < 1) return '';
  let encrypted = '' ;
  let cip = crypto.createCipher(algorithm, key);
  encrypted += cip.update(buf, 'binary', 'hex');
  encrypted += cip.final('hex');
  return encrypted;
}

export async function decipher(algorithm, key, encrypted = '') {
  if(encrypted === undefined || encrypted === null || encrypted.length < 1) return '';
  let decrypted = '';
  let decipher = crypto.createDecipher(algorithm, key);
  decrypted += decipher.update(encrypted, 'hex', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
}