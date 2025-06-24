import CryptoJS from 'crypto-js';

export function encrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(text, process.env.SECRET_KEY).toString();
    return ciphertext;
}

export function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

