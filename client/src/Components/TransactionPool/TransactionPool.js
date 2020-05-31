import React, { useState, useEffect } from 'react'
import axios from 'axios';

import {
  GET_TRANSACTION_POOL_URL,
  MINE_BLOCK,
  SECONDS_JS
} from '../../config';

const TransactionPool = () => {
  // get transaction pool
  const [transactions, setTransactions] = useState({});
  const getTransactions = async () => {
    const { data: { transactionPool } } = await axios.get(`${GET_TRANSACTION_POOL_URL}/`);
    setTransactions(transactionPool);
    // console.log(transactionPool);
  };

  useEffect(() => {
    getTransactions();
    const intervalId = setInterval(getTransactions, 60 * SECONDS_JS);

    return () => {
      clearInterval(intervalId);
    }
  }, []);


  // mine transactions === mine a new block (in this project)
  const mineBlock = async ({ minerAddress }) => {
    const { data: blockchain } = await axios.post(`${MINE_BLOCK}`, { minerAddress });
    // setBlockchain(blockchain);

    // re-calculate balance 
    // getWalletBalance({ publicKey: minerAddress });
    console.log(blockchain);
    // go to blockchain UI
  };

  return (
    <div>
      TransactionPool
      {/* 
      <button style={{ width: 150, height: 150 }} onClick={() => mineBlock({ minerAddress: walletInfo.publicKey })} >
        Mine new block
      </button>
      */}
    </div>
  )
}

export default TransactionPool
