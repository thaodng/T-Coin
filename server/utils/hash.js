const SHA256 = require('crypto-js/sha256');

const hash = (...inputs) => {

  return SHA256(inputs.map(input => JSON.stringify(input)).sort().join('')).toString();
};

// console.log(hash(1, 2, 3, 'abc', 'def', { a: 1, b: 2 }));
// console.log(hash('abc', 'def', 1, 2, 3, { a: 1, b: 2 }));

module.exports = hash;