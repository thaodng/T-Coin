const INIT_DIFFICULTY = 8;
const BLOCK_GENERATION_INTERVAL = 3000; // miliseconds


const GENESIS_BLOCK = {
  index: 0,
  nonce: 0,
  difficulty: INIT_DIFFICULTY,
  timestamp: 1,
  data: [],
  previousHash: '-----',
  hash: '0000e326186933fa83f0efd581d09409022ec07b73a10f549bbaa6472e8a1175'
};

module.exports = {
  GENESIS_BLOCK,
  BLOCK_GENERATION_INTERVAL
}