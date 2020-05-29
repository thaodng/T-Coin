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
      transaction => Transaction.validTransaction(transaction)
    );
  }

  clear() {
    this.transactionMap = {};
  }
}

module.exports = TransactionPool;
