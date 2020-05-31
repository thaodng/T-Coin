import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Block from '../Block/Block';


const Blockchain = ({ blockchain }) => {
  console.log(blockchain);

  const data = [
    {
      index: 0,
      nonce: 0,
      difficulty: 8,
      timestamp: '2018-04-24 18:00:00',
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000".slice(0, 15) + "...",
      hash: "0000e326186933fa83f0efd581d09409022ec07b73a10f549bbaa6472e8a1175".slice(0, 15) + "..."
    },
    {
      index: 1,
      nonce: 132,
      difficulty: 7,
      timestamp: '2018-04-24 18:00:00',
      previousHash: "0000e326186933fa83f0efd581d09409022ec07b73a10f549bbaa6472e8a1175".slice(0, 15) + "...",
      hash: "0135674960b9f6f0be6d72c1a650c878139992c64a0656c80adf2ebedac0bbe5".slice(0, 15) + "..."
    },
    {
      index: 1,
      nonce: 132,
      difficulty: 7,
      timestamp: '2018-04-24 18:00:00',
      previousHash: "0000e326186933fa83f0efd581d09409022ec07b73a10f549bbaa6472e8a1175".slice(0, 15) + "...",
      hash: "0135674960b9f6f0be6d72c1a650c878139992c64a0656c80adf2ebedac0bbe5".slice(0, 15) + "..."
    },
  ];

  const columns = [
    {
      title: 'Id', key: 'index', dataIndex: 'index'
    },
    {
      title: 'Nonce', key: 'nonce', dataIndex: 'nonce'
    },
    { title: 'Difficulty', key: 'difficulty', dataIndex: 'difficulty' },
    {
      title: 'Time', key: 'timestamp', dataIndex: 'timestamp'
    },
    {
      title: 'Prev. Hash', key: 'prev', dataIndex: 'previousHash'
    },
    {
      title: 'Hash', key: 'hash', dataIndex: 'hash'
    },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <Button type="primary" onClick={() => { console.log('a') }}>View detail</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ height: '370px', backgroundColor: 'white' }} />
      <Block />
    </div>
  );
};

export default Blockchain;





