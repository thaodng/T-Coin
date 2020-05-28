const express = require('express');
const axios = require('axios');

const Block = require('./Components/Block');
const Blockchain = require('./Components/Blockchain');
const Redis = require('./redis');

const REDIS_URL = 'redis://127.0.0.1:6379';
const DEFAULT_PORT = 5000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
let PEER_PORT;

const app = express();
const blockchain = new Blockchain();
const redis = new Redis({blockchain, redisUrl: REDIS_URL});
// blockchain.addNewBlock({ data: 'how are u' });


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


const getNewestState = async () => {
  try {
    const { data } = await axios.get(`${ROOT_NODE_ADDRESS}/blockchain`);
    const rootChain = data.blockchain;
    blockchain.replaceChain(rootChain);
    console.log(blockchain);
    console.log('Get lastest chain success!!!');
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
