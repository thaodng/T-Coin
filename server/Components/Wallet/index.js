const Transaction = require('../Transaction');
const ec = require('../../utils/ec');
const { STARTED_CAPITAL } = require('../../config');

class Wallet {
  constructor({ publicKey }) {
    this.balance = STARTED_CAPITAL;
    this.publicKey = publicKey; // only save publicKey(address)
  }

  // sign on hash <-> encrypt data by privateKey
  sign({ data, privateKey }) {
    const keyPair = ec.keyFromPrivate(privateKey);
    return keyPair.sign(cryptoHash(data));
  }

  // create transaction 
  createTrasaction({ recipientAddress, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey
      });
    }

    if (amount > this.balance) {
      throw new Error('Amount exceeds balance');
    }

    return new Transaction({ sender: this, recipientAddress, amount });
  };


  // calculate balance
  static calculateBalance({ chain, address }) {
    let hasConductedTransaction = false;
    let outputsTotal = 0;

    for (let i = chain.length - 1; i > 0; i--) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (transaction.txIn.address === address) {
          hasConductedTransaction = true;
        }

        const addressOutput = transaction.txOuts[address];

        if (addressOutput) {
          outputsTotal += addressOutput;
        }
      }

      // transaction which has address appear in txIn and txOus
      if (hasConductedTransaction) {
        break;
      }
    }

    return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;
  }



}

module.exports = Wallet;