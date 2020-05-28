const hexToBinary = require('hex-to-binary');
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
    const previousHash = latestBlock.hash;
    const difficulty = latestBlock.difficulty;
    
    let nonce, timestamp;
    nonce = 0;

    while (true) {
      timestamp = Date.now();
      const hash = cryptoHash(index, nonce, difficulty, timestamp, data, previousHash);
      const hashInBinary = hexToBinary(hash);
      if (hashInBinary.startsWith('0'.repeat(difficulty))) {
        return new this({ index, nonce, difficulty, timestamp, data, previousHash, hash });
      }
      nonce++;
    }
  };

}

module.exports = Block;