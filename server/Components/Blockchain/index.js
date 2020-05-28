const Block = require('../Block');
const cryptyoHash = require('../../utils/crypto-hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  };

  addNewBlock({ data }) {
    const newBlock = Block.generateNextBlock({
      latestBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  };

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const previousBlock = chain[i - 1];
      const currentBlock = chain[i];
      const { index, nonce, difficulty, timestamp, data, previousHash, hash } = currentBlock;

      // last hash reference
      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }


      // validate hash of current block
      const validatedHash = cryptyoHash(index, nonce, difficulty, timestamp, data, previousHash);
      if (validatedHash !== hash) {
        console.log('Sai ở đây 3');
        return false;
      }
    }

    return true;
  };
}

module.exports = Blockchain;