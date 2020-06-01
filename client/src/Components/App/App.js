import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import {
  WalletOutlined,
  TransactionOutlined,
  RadarChartOutlined
} from '@ant-design/icons';

import CryptoLayout from '../CryptoLayout/CryptoLayout';
import Wallet from '../Wallet/Wallet';
import TransactionPool from '../TransactionPool/TransactionPool';
import Blockchain from '../Blockchain/Blockchain';

import {
  GET_BLOCKCHAIN_URL,
  GET_TRANSACTION_POOL_URL,
  SECONDS_JS
} from '../../config';

const { TabPane } = Tabs;

const App = () => {
  // get blockchain network
  const [blockchain, setBlockchain] = useState([]);
  const [transactions, setTransactions] = useState({});

  // create wallet === create account
  const [walletInfo, setWalletInfo] = useState({});
  const [dataWalletTransactions, setDataWalletTransactions] = useState([]);


  const getBlockchain = async () => {
    const { data: { blockchain } } = await axios.get(`${GET_BLOCKCHAIN_URL}`);
    setBlockchain(blockchain);
    // console.log(blockchain);
  };

  // get transaction pool
  const getTransactions = async () => {
    const { data: { transactionPool } } = await axios.get(`${GET_TRANSACTION_POOL_URL}/`);
    setTransactions(transactionPool);
    // console.log(transactionPool);
  };

  useEffect(() => {
    getBlockchain();
    getTransactions();
    const intervalId = setInterval(getTransactions, 5 * SECONDS_JS);
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <CryptoLayout >
      <div >
        <Tabs
          style={{ padding: '16px' }}
        >
          <TabPane tab={<span><WalletOutlined style={{ fontSize: '16px' }} /> Wallet</span>} key="1">
            <Wallet
              walletInfo={walletInfo}
              setWalletInfo={setWalletInfo}
              dataWalletTransactions={dataWalletTransactions}
              setDataWalletTransactions={setDataWalletTransactions}
            />
          </TabPane>
          <TabPane tab={<span><TransactionOutlined style={{ fontSize: '16px' }} />Transaction pool</span>} key="2">
            <TransactionPool
              walletInfo={walletInfo}
              setWalletInfo={setWalletInfo}
              setDataWalletTransactions={setDataWalletTransactions}
              setBlockchain={setBlockchain}
              transactions={transactions}
            />
          </TabPane>
          <TabPane tab={<span><RadarChartOutlined style={{ fontSize: '16px' }} />Blockhain network</span>} key="3">
            <Blockchain blockchain={blockchain} />
          </TabPane>
        </Tabs>
      </div>
    </CryptoLayout>
  );
}

export default App;
