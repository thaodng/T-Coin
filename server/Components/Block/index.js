const { GENESIS_BLOCK } = require('../../config');
const cryptoHash = require('../../utils/crypto-hash');

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

  // generateNextBlock == createBlock === add instance of class
  static generateNextBlock({ latestBlock, data }) {
    const index = latestBlock.index + 1;
    const nonce = latestBlock.nonce + Math.random() * 100;
    const difficulty = latestBlock.difficulty;
    const timestamp = Date.now();
    const previousHash = latestBlock.hash;
    const hash = cryptoHash(index, nonce, difficulty, timestamp, data, previousHash);
    return new this({ index, nonce, difficulty, timestamp, data, previousHash, hash });
  };
  
}

module.exports = Block;