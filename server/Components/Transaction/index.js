const { v4: uuidv4 } = require('uuid');
const verifySignature = require('../../utils/verify-signature');

// txOuts === transaction outputs
// txIn === transaction input

class Transaction {
  constructor({ sender, recipientAddress, amount, txOuts, txIn }) {
    this.id = uuidv4();
    this.txOuts = txOuts || this.createTxOuts({ sender, recipientAddress, amount });
    this.txIn = txIn || this.createTxIn({ sender, txOuts: this.txOuts });
  }

  createTxOuts({ sender, recipientAddress, amount }) {
    const txOuts = {};
    txOuts[recipientAddress] = amount;
    txOuts[sender.publicKey] = sender.balance - amount;

    return txOuts;
  };

  createTxIn({ sender, txOuts }) {
    return {
      timestamp: Date.now(),
      senderAddress: sender.publicKey,
      amount: sender.balance,
      signature: sender.sign(txOuts)
    };
  };


  static isValid(transaction) {
    const { txIn: { senderAddress, amount, signature }, txOuts } = transaction;

    // total money before send === total money of recipients + money of sender
    const totalMoney = Object.values(txOuts).reduce((total, outputAmount) => total + outputAmount);
    if (amount !== totalMoney) {
      console.error(`Invalid transaction from ${address}`);
      return false;
    }

    // verify signature
    if (!verifySignature({ publicKey: senderAddress, data: txOuts, signature })) {
      console.error(`Invalid transaction from ${address}`);
      return false;
    }

    return true;
  };


  

};

module.exports = Transaction;