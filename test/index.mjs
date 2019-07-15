import { encode, decode } from '../lib/base58.mjs';
import { strict as assert } from 'assert';

function compare(str, ba) {
    const encoded = encode(ba);
    assert.strictEqual(encoded, str);

    const decoded = decode(str);
    assert.strictEqual(decoded.length, ba.length);
    for (let i = 0; i < decoded.length; i++) {
        assert.strictEqual(decoded[i], ba[i]);
    }
}

compare('', Buffer.alloc(0));
compare('111', [0, 0, 0]);
compare('72k1xXWG59wUsYv7h2', Buffer.from('Hello, world!'));
compare('16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS', Buffer.from('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex'));
