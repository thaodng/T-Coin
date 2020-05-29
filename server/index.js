const express = require('express');
const axios = require('axios');
const ec = require('./utils/ec');

const Block = require('./Components/Block');
const Blockchain = require('./Components/Blockchain');
const Wallet = require('./Components/Wallet');
const Transaction = require('./Components/Transaction');
const TransactionPool = require('./Components/TransactionPool');
const Redis = require('./redis');

const REDIS_URL = 'redis://127.0.0.1:6379';
const DEFAULT_PORT = 5000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const redis = new Redis({ blockchain, transactionPool, redisUrl: REDIS_URL });
let PEER_PORT;
// blockchain.addNewBlock({ data: 'how are u' });
// console.log(ec.keyFromPrivate("f1a17ae23cffb92c50e3a0ae8dd55984a19ce5af35c5fa14557630ed75025610").getPublic().encode("hex"));
console.log(process.env.PEER_NUMBER);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/blockchain', (req, res) => {
  res.status(200).json({ blockchain: blockchain.chain });
});

app.post('/mine-block', (req, res) => {
  const { data } = req.body;
  blockchain.addNewBlock({ data });

  // broadcast to network
  redis.broadcastChain();
  res.redirect('/blockchain');
});

app.post('/create-wallet', (req, res) => {
  keyPair = ec.genKeyPair()
  privateKey = keyPair.getPrivate();
  publicKey = keyPair.getPublic().encode('hex');

  // create wallet with new publicKey
  const wallet = new Wallet({ chain: blockchain.chain, publicKey });

  res.status(200).json({ wallet, privateKey });
});

app.post('/wallet-balance', (req, res) => {
  const { publicKey } = req.body;

  if (!publicKey) {
    console.log('Please create or using old wallet!');
  }

  const balance = Wallet.calculateBalance({
    chain: blockchain.chain,
    address: publicKey
  });

  res.status(200).json({ balance });
});

app.post('/create-transaction', (req, res) => {
  const { recipientAddress, amount, senderAddress, senderPrivateKey } = req.body;

  // create wallet with existing address;
  const wallet = new Wallet({ chain: blockchain.chain, publicKey: senderAddress });

  let transaction = transactionPool.existingTransaction({ senderAddress });

  try {
    if (transaction) {
      transaction.update({ sender: wallet, senderPrivateKey, recipientAddress, amount });
    } else {
      transaction = wallet.createTrasaction({
        recipientAddress,
        amount,
        senderPrivateKey,
        chain: blockchain.chain
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  transactionPool.setTransaction(transaction);

  redis.broadcastTransaction(transaction);

  res.status(200).json({ transaction });

});

app.get('/transaction-pool', (req, res) => {
  res.status(200).json({ transactionPool: transactionPool.transactionMap });
});

const getNewestState = async () => {
  try {
    // sync a newest blockchain
    const blockchainResult = await axios.get(`${ROOT_NODE_ADDRESS}/blockchain`);
    const rootChain = blockchainResult.data.blockchain;
    blockchain.replaceChain(rootChain);

    // sync a newest transaction pool
    const transactionPoolResult = await axios.get(`${ROOT_NODE_ADDRESS}/transaction-pool`);
    const rootPool = transactionPoolResult.data.transactionPool;
    transactionPool.set(rootPool);

    console.log('Get lastest chain & transactions pool success!!!');
  } catch (error) {
    console.log(error);
  }
};

// Node không phải node chạy đầu tiên
if (process.env.GENERATE_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  if (PEER_PORT) {
    getNewestState();
  }
});
