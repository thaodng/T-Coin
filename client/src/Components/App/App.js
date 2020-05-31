import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Layout } from 'antd';
import {
  WalletOutlined,
  TransactionOutlined,
  RadarChartOutlined
} from '@ant-design/icons';

import {
  GET_BLOCKCHAIN_URL,
  GET_TRANSACTION_POOL_URL,
  MINE_BLOCK,
  SECONDS_JS
} from '../../config';

import './App.css';
import logo from '../../assets/images/logo.png';
import Wallet from '../Wallet/Wallet';
import TransactionPool from '../TransactionPool/TransactionPool';
import Blockchain from '../Blockchain/Blockchain';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const App = () => {
  // console.log(walletInfo); 
  return (
    <Layout className="ant-layout">
      <Header className="Header">
        <img className="logo" src={logo} alt="logo" />
        <h3 style={{ marginTop: '15px', marginLeft: '20px' }}>Cryptocurrency wallet for my coin</h3>
      </Header>
      <Content className="App">
        <div className="App">
          <Tabs
            style={{ padding: '16px' }}
            defaultActiveKey="1" >
            <TabPane tab={<span><WalletOutlined style={{ fontSize: '16px' }} /> Wallet</span>} key="1">
              <Wallet />
            </TabPane>
            <TabPane tab={<span><TransactionOutlined style={{ fontSize: '16px' }} />Transaction pool</span>} key="2">
              <TransactionPool />
            </TabPane>
            <TabPane tab={<span><RadarChartOutlined style={{ fontSize: '16px' }} />Blockhain network</span>} key="3">
              <Blockchain />
            </TabPane>
          </Tabs>
        </div>


      </Content>
      <Footer>Simple cryptocurrency</Footer>
    </Layout >
  );
}

export default App;
