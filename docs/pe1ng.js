require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({3:[function(require,module,exports) {
const e="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";function o(o){const t=[];for(let e of o){for(let o=0;o<t.length;o++)t[o]=256*t[o]+e,e=t[o]/58|0,t[o]%=58;for(;e;e=e/58|0)t.push(e%58)}for(let e of o){if(e)break;t.push(0)}let r="";for(let o=t.length;o--;)r+=e[t[o]];return r}function t(o){const t=[];for(let r of o){let o=e.indexOf(r);if(-1===o)throw new Error(`${r} is not base58 alphabet`);for(let e=0;e<t.length;e++)t[e]=58*t[e]+o,o=t[e]>>>8,t[e]&=255;for(;o;o>>=8)t.push(255&o)}for(let e of o){if("1"!==e)break;t.push(0)}return t.reverse()}module.exports={encode:o,decode:t};
},{}],2:[function(require,module,exports) {
const e=require("./lib/base58"),t=e=>document.getElementById(e);function n(e){let t=58*Math.random()|0;for(let n=e.length;n--;)e[n]=58*e[n]+t,t=e[n]>>>8,e[n]&=255;t&&e.unshift(t)}function r(e){t("errorMessage").textContent=e}t("createButton").addEventListener("click",async s=>{r("");const o="Pe1ng"+t("username").value;let i;try{i=e.decode(o)}catch(e){return void r("ID には 0 (ゼロ), O (オー), I (アイ), l(エル) を除く英数字のみ使用できます")}if(i.length>20)return void r("ID が長すぎます");for(;i.length<24;)n(i);i.unshift(0);const a=Uint8Array.of(...i.slice(0,21)).buffer,c=await crypto.subtle.digest("SHA-256",a),l=await crypto.subtle.digest("SHA-256",c),d=new Uint8Array(l),u=Uint8Array.of(...i.slice(0,21),...d.slice(0,4)),f=e.encode(u);t("address").textContent=f,t("address").href="https://blockchain.info/address/"+f,t("howto").style.display="block"},!1);
},{"./lib/base58":3}]},{},[2])