const Transaction = require('../Transaction');

class Miner {
  constructor({ blockchain, transactionPool, minerAddress, redis }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.minerAddress = minerAddress;
    this.redis = redis;
  }

  mineTransactions() {
    // only get valid transactions from the transaction pool
    const validTransactions = this.transactionPool.validTransactions();

    // generate a mining reward
    validTransactions.push(
      Transaction.rewardTransaction({ minerAddress: this.minerAddress })
    );

    // add a block to to blockchain network
    this.blockchain.addNewBlock({ data: validTransactions });

    // broadcast updated blockchain to entire network
    this.redis.broadcastChain();

    // clear transaction pool
    this.transactionPool.clear();

    //should broadcast clean transaction pool too???
  }
}

module.exports = Miner;