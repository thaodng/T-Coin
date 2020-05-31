import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import Transaction from '../Transaction/Transaction';
import {
  MINE_BLOCK,
  GET_WALLET_BALANCE_URL
} from '../../config';

const TransactionPool = ({ walletInfo, setWalletInfo, setBlockchain, transactions }) => {
  const [currentSelect, setCurrentSelect] = useState({});

  // mine transactions === mine a new block (in this project)
  const onMineBlock = async () => {
    const { data: blockchain } = await axios.post(`${MINE_BLOCK}`, { minerAddress: walletInfo.publicKey });
    // re-calculate balance 
    getWalletBalance({ publicKey: walletInfo.publicKey });
    // setBlockchain(blockchain);
    console.log(blockchain);
    message.info('Mine a new block success');

  };

  const getWalletBalance = async ({ publicKey }) => {
    const { data: { balance } } = await axios.post(`${GET_WALLET_BALANCE_URL}/`, { publicKey });
    const wallet = { publicKey, balance };
    setWalletInfo(wallet);
  };

  const transactionsData = Object.keys(transactions)
    .map(transactionId => {
      return {
        id: transactions[transactionId].id,
        timestamp: new Date(transactions[transactionId].txIn.timestamp).toLocaleString(),
        senderAddress: `${transactions[transactionId].txIn.senderAddress.slice(0, 64)}....`,
        amount: transactions[transactionId].txIn.amount,
      }
    });

  const columns = [
    {
      title: 'Transaction Id', key: 'id', dataIndex: 'id'
    },
    {
      title: 'Timestamp', key: 'timestamp', dataIndex: 'timestamp'
    },
    { title: 'Sender address', key: 'address', dataIndex: 'senderAddress' },
    {
      title: 'Sender balance', key: 'balance', dataIndex: 'amount'
    },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <Button type="primary" onClick={() => { setCurrentSelect(transactions[record.id]) }}>View detail</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={transactionsData}
        pagination={false}
        style={{ height: '370px', backgroundColor: 'white' }} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '12px', marginBottom: '12px' }}>
        {
          walletInfo.publicKey && (
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onMineBlock}>Mine transactions
            </Button>
          )
        }
      </div>
      {currentSelect.id && <Transaction transactionData={currentSelect} />}
    </div>
  );
};

export default TransactionPool
