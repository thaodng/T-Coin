const Transaction = require('../Transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  // this for for a later peer synchronous with root
  set(transactionMap) {
    this.transactionMap = transactionMap;
  }

  // this is include create transaction and update old one
  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  existingTransaction({ senderAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find(transaction => transaction.txIn.senderAddress === senderAddress);
  }

  validTransactions() {
    return Object.values(this.transactionMap).filter(
      transaction => Transaction.isValid(transaction)
    );
  }

  clear() {
    this.transactionMap = {};
  }

  // clear transactions which haved been recorded in blockchain
  // we will broadcast this transaction when a new block was mined
  clearBlockchainTransactions({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      for (let transaction of block.data) {
        if (this.transactionMap.hasOwnProperty(transaction.id)) {
          delete this.transactionMap[transaction.id];
        };
      };
    };
  };
}

module.exports = TransactionPool;
