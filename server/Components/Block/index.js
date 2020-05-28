const { GENESIS_BLOCK } = require('../../config');

class Block {
  constructor({ index, nonce, difficulty, timestamp, data, previousHash, hash }) {
    this.index = index;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.timestamp = timestamp;
    this.data = data; // transactions
    this.previousHash = previousHash;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_BLOCK)
  }
}

module.exports = Block;