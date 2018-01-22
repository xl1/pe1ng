const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function encode(bytes) {
    const digits = [];
    for (let num of bytes) {
        for (let i = 0; i < digits.length; i++) {
            digits[i] = digits[i] * 256 + num;
            num = digits[i] / 58 | 0;
            digits[i] %= 58;
        }
        for (; num; num = num / 58 | 0) {
            digits.push(num % 58);
        }
    }
    for (let num of bytes) {
        if (num) break;
        digits.push(0);
    }
    let result = '';
    for (let i = digits.length; i--;) {
        result += ALPHABET[digits[i]];
    }
    return result;
}

function decode(str) {
    const bytes = [];
    for (let c of str) {
        let num = ALPHABET.indexOf(c);
        if (num === -1) {
            throw new Error(`${c} is not base58 alphabet`);
        }
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = bytes[i] * 58 + num;
            num = bytes[i] >>> 8;
            bytes[i] &= 255;
        }
        if (num) {
            bytes.push(num);
        }
    }
    for (let c of str) {
        if (c !== '1') break;
        bytes.push(0);
    }
    return bytes.reverse();
}

module.exports = { encode, decode };
