const hexToBinary = require('hex-to-binary');
const { GENESIS_BLOCK, BLOCK_GENERATION_INTERVAL } = require('../../config');
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
  static generateNextBlock({ lastestBlock, data }) {
    const index = lastestBlock.index + 1;
    const previousHash = lastestBlock.hash;

    let nonce, difficulty, timestamp;
    nonce = 0;

    while (true) {
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ lastestBlock, timestamp });
      const hash = cryptoHash(index, nonce, difficulty, timestamp, data, previousHash);
      const hashInBinary = hexToBinary(hash);
      if (hashInBinary.startsWith('0'.repeat(difficulty))) {
        return new this({ index, nonce, difficulty, timestamp, data, previousHash, hash });
      }
      nonce++;
    }
  };

  static adjustDifficulty({ lastestBlock, timestamp }) {
    const { difficulty } = lastestBlock;
    const timeTaken = timestamp - lastestBlock.timestamp;

    if (difficulty === 1) return;

    if (timeTaken > BLOCK_GENERATION_INTERVAL * 2) {
      return difficulty - 1;
    } else if (timeTaken < BLOCK_GENERATION_INTERVAL / 2) {
      return difficulty - 1;
    } else {
      return difficulty;
    }
  };

};

module.exports = Block;