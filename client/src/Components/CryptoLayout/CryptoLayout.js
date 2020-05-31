import React from 'react';
import { Layout } from 'antd';
import logo from '../../assets/images/logo.png';
import '../App/App.css';

const { Header, Content } = Layout;

const CryptoLayout = ({ children }) => {
  return (
    <Layout className="ant-layout">
      <Header className="Header">
        <img className="logo" src={logo} alt="logo" />
        <h3 >Cryptocurrency wallet for my coin</h3>
      </Header>
      <Content className="App">
        {children}
      </Content>
    </Layout >
  );
};

export default CryptoLayout;
