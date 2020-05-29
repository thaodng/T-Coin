const INIT_DIFFICULTY = 8;
const GENESIS_BLOCK = {
  index: 0,
  nonce: 0,
  difficulty: INIT_DIFFICULTY,
  timestamp: 1,
  data: [],
  previousHash: '0'.repeat(64),
  hash: '0000e326186933fa83f0efd581d09409022ec07b73a10f549bbaa6472e8a1175'
};

const BLOCK_GENERATION_INTERVAL = 3000; // miliseconds

// for testing purpose
const STARTED_CAPITAL = 1000;

const REWARD_INPUT = { senderAddress: '**Reward-for-mining-a-new-block**' };

const MINING_REWARD = 50;

module.exports = {
  GENESIS_BLOCK,
  BLOCK_GENERATION_INTERVAL,
  STARTED_CAPITAL,
  REWARD_INPUT,
  MINING_REWARD
}