import React, { useState, useEffect } from 'react';
import { Tabs, Layout } from 'antd';
import axios from 'axios';
import {
  WalletOutlined,
  TransactionOutlined,
  RadarChartOutlined
} from '@ant-design/icons';
import {
  GET_BLOCKCHAIN_URL,
  CREATE_WALLET_URL,
  GET_WALLET_BALANCE_URL,
  CREATE_TRANSACTION,
  GET_TRANSACTION_POOL_URL,
  MINE_BLOCK,
  SECONDS_JS
} from '../../config';
import logo from '../../assets/images/logo.png';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

/* 
 *walletInfo: balance, publicKey
 */
const App = () => {
  // get blockchain network
  const [blockchain, setBlockchain] = useState([]);
  const getBlockchain = async () => {
    const { data: { blockchain } } = await axios.get(`${GET_BLOCKCHAIN_URL}`);
    setBlockchain(blockchain);
  };

  useEffect(() => {
    getBlockchain();
  }, [])

  // create wallet === create account
  const [walletInfo, setWalletInfo] = useState({
    "balance": 1000,
    "publicKey": "04662d60cd721116a3370793d28762164e8a5d4f2505d17754f0a8670ccc9ed42cf5447a9d559621e7fcdd3a5ecbd139490545986603ec7a45b806bb70eaf10fa1"
  });


  const createWallet = async () => {
    const { data: { wallet } } = await axios.post(`${CREATE_WALLET_URL}/`);
    setWalletInfo(wallet);
  };

  // get wallet balance === login
  const getWalletBalance = async ({ publicKey }) => {
    const { data: { balance } } = await axios.post(`${GET_WALLET_BALANCE_URL}/`, { publicKey });
    const wallet = { publicKey, balance };
    setWalletInfo(wallet);
  };


  // create transaction
  const [recipientAddress, setRecipientAddress] = useState('foo');
  const [amount, setAmount] = useState(100);

  const createTransaction = async ({ recipientAddress, amount, senderPrivateKey }) => {
    const { data: { transaction } } = await axios
      .post(`${CREATE_TRANSACTION}/`, {
        recipientAddress,
        amount,
        senderAddress: walletInfo.publicKey,
        senderPrivateKey
      });

    // go to transaction pool UI
    console.log(transaction);

    // we call get transaction-pool every x - seconds, so in the future, using socket.io here
  };


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
    setBlockchain(blockchain);

    // re-calculate balance 
    getWalletBalance({ publicKey: minerAddress });
    console.log(blockchain);
    // go to blockchain UI
  };

  // console.log(walletInfo); 
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="Header">
        <img className="logo" src={logo} alt="logo" />
        <h3 style={{ marginTop: '15px', marginLeft: '20px' }}>Cryptocurrency wallet for my coin</h3>
      </Header>
      <Content className="App">
        <div className="App">
          <Tabs
            style={{ padding: '16px' }}
            defaultActiveKey="1" >
            <TabPane tab={<span><WalletOutlined style={{fontSize: '16px'}} /> Wallet</span>} key="1">
              {/* <WalletsContent /> */}
            </TabPane>
            <TabPane tab={<span><TransactionOutlined style={{ fontSize: '16px' }}/>Transaction pool</span>} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={<span><RadarChartOutlined style={{ fontSize: '16px' }} />Blockhain network</span>} key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>


      </Content>
      <Footer>Simple cryptocurrency</Footer>
    </Layout >
  );
}

export default App;
