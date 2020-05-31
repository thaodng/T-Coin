import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Tabs, Button, Modal, message } from 'antd';
import {
  WalletOutlined,
  TransactionOutlined,
  RadarChartOutlined
} from '@ant-design/icons';

import './App.css';
import logo from '../../assets/images/logo.png';
import Wallet from '../Wallet/Wallet';
import TransactionPool from '../TransactionPool/TransactionPool';
import Blockchain from '../Blockchain/Blockchain';

import {
  GET_BLOCKCHAIN_URL,
  CREATE_WALLET_URL,
  GET_WALLET_BALANCE_URL,
  CREATE_TRANSACTION,
  GET_TRANSACTION_POOL_URL,
  MINE_BLOCK,
  SECONDS_JS
} from '../../config';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const App = () => {
  // get blockchain network
  const [blockchain, setBlockchain] = useState([]);
  const [transactions, setTransactions] = useState({});

  const getBlockchain = async () => {
    const { data: { blockchain } } = await axios.get(`${GET_BLOCKCHAIN_URL}`);
    setBlockchain(blockchain);
    console.log(blockchain);
  };

  // get transaction pool
  const getTransactions = async () => {
    const { data: { transactionPool } } = await axios.get(`${GET_TRANSACTION_POOL_URL}/`);
    setTransactions(transactionPool);
    console.log(transactionPool);
  };

  useEffect(() => {
    getBlockchain();
    getTransactions();
    const intervalId = setInterval(getTransactions, 60 * SECONDS_JS);
    return () => {
      clearInterval(intervalId);
    }
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


  // mine transactions === mine a new block (in this project)
  const mineBlock = async ({ minerAddress }) => {
    const { data: blockchain } = await axios.post(`${MINE_BLOCK}`, { minerAddress });
    // setBlockchain(blockchain);

    // re-calculate balance 
    // getWalletBalance({ publicKey: minerAddress });
    console.log(blockchain);
    // go to blockchain UI
  };

  console.log(walletInfo);
  return (
    <Layout className="ant-layout">
      <Header className="Header">
        <img className="logo" src={logo} alt="logo" />
        <h3 >Cryptocurrency wallet for my coin</h3>
      </Header>
      <Content className="App">
        <div className="App">
          <Tabs
            style={{ padding: '16px' }}
            defaultActiveKey="3" >
            <TabPane tab={<span><WalletOutlined style={{ fontSize: '16px' }} /> Wallet</span>} key="1">
              <Wallet
                walletInfo={walletInfo}
                onCreateWallet={() => createWallet()}
                onGetWalletBalance={() => getWalletBalance({ publicKey: walletInfo.publicKey })}
                onCreateTransaction={() => createTransaction({
                  recipientAddress: recipientAddress,
                  amount: amount,
                  senderPrivateKey: '5c359bc01562813fc348622a9027c89432758c2e6f481b0490b8347edcc649fc'
                })}
              />
            </TabPane>
            <TabPane tab={<span><TransactionOutlined style={{ fontSize: '16px' }} />Transaction pool</span>} key="2">
              <TransactionPool
                transactions={transactions}
                onMineBlock={() => mineBlock({ minerAddress: walletInfo.publicKey })}
              />
            </TabPane>
            <TabPane tab={<span><RadarChartOutlined style={{ fontSize: '16px' }} />Blockhain network</span>} key="3">
              <Blockchain
                blockchain={blockchain}
              />
            </TabPane>
          </Tabs>
        </div>
      </Content>
      {/* <Footer>Simple cryptocurrency</Footer> */}
    </Layout >
  );
}

export default App;
