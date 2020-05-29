const API_BASE_URL = process.env.REACT_APP_API_URL
  ? `http://localhost:${process.env.REACT_APP_API_URL}` : `http://localhost:5000`;
const GET_BLOCKCHAIN_URL = `${API_BASE_URL}/blockchain`;
const CREATE_WALLET_URL = `${API_BASE_URL}/create-wallet`;
const GET_WALLET_BALANCE_URL = `${API_BASE_URL}/wallet-balance`;
const CREATE_TRANSACTION = `${API_BASE_URL}/create-transaction`;
const GET_TRANSACTION_POOL_URL = `${API_BASE_URL}/transaction-pool`;
const CREATE_BLOCK = `${API_BASE_URL}/mine-transaction`;

const MILLISECONDS_JS = 1;
const SECONDS_JS = MILLISECONDS_JS * 1000;

export {
  API_BASE_URL,
  GET_BLOCKCHAIN_URL,
  CREATE_WALLET_URL,
  GET_WALLET_BALANCE_URL,
  CREATE_TRANSACTION,
  GET_TRANSACTION_POOL_URL,
  CREATE_BLOCK,
  SECONDS_JS
};