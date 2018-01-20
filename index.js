const base58 = require('./lib/base58');

const $ = id => document.getElementById(id);

function shift(bytes) {
    let carry = Math.random() * 58 | 0;
    for (let i = bytes.length; i--;) {
        bytes[i] = bytes[i] * 58 + carry;
        carry = bytes[i] >>> 8;
        bytes[i] &= 255;
    }
    if (carry) {
        bytes.unshift(carry);
    }
}

function error(msg) {
    $('errorMessage').textContent = msg;
}

$('createButton').addEventListener('click', async ev => {
    error('');

    const b58str = 'Pe1ng' + $('username').value;
    let bytes;
    try {
        bytes = base58.decode(b58str);
    } catch (e) {
        error('ID には 0 (ゼロ), O (オー), I (アイ), l(エル) を除く英数字のみ使用できます');
        return;
    }
    if (bytes.length > 20) {
        error('ID が長すぎます');
        return;
    }
    while (bytes.length < 24) {
        shift(bytes);
    }
    bytes.unshift(0);

    const buffer = Uint8Array.of(...bytes.slice(0, 21)).buffer;
    const hash1 = await crypto.subtle.digest('SHA-256', buffer);
    const hash2 = await crypto.subtle.digest('SHA-256', hash1);
    const checksum = new Uint8Array(hash2);
    const bytesWithCheck = Uint8Array.of(...bytes.slice(0, 21), ...checksum.slice(0, 4));
    const address = base58.encode(bytesWithCheck);

    $('address').textContent = address;
    $('address').href = 'https://blockchain.info/address/' + address;
    $('howto').style.display = 'block';
}, false);
