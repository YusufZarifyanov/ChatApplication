const crypto = require('crypto');
 
const algorithm = 'aes-256-cbc';
 
class AESCrypter {
  constructor() {}
 
     // Шифрование AES
  static encrypt(key, iv, data) {
    iv = iv || "";
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const cipherChunks = [];
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
  }
 
     // Расшифровка AES
  static decrypt(key, iv, data) {
    if (!data) {
      return "";
    }
    iv = iv || "";
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const cipherChunks = [];
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
  }
 
}

class DiffieHellman extends crypto.DiffieHellman {
    // Чтобы не передавать простое число на обоих концах, используйте определенное простое число и генератор
 constructor(
   prime = 'c23b53d262fa2a2cf2f730bd38173ec3',
   generator = '05'
 ) {
   super(prime, 'hex', generator, 'hex');
 }

    // Создаем пару ключей и возвращаем открытый ключ
 getKey() {
   return this.generateKeys('base64');
 }

    // Используем открытый ключ другой стороны для генерации ключа
 getSecret(otherPubKey) {
   return this.computeSecret(otherPubKey, 'base64', 'hex');
 }

 static createPrime(encoding=null, primeLength=128, generator=2) {
   const dh = new crypto.DiffieHellman(primeLength, generator);
   return dh.getPrime(encoding);
 }

}


const dh = new DiffieHellman();
const pub1 = dh.getKey();
const key = dh.getSecret(pub1)

console.log(key)