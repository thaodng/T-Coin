import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Block from '../Block/Block';


const Blockchain = ({ blockchain }) => {
  const [blockInfo, setBlockInfo] = useState({});

  const data = blockchain.map(block => {
    return {
      key: block.index,
      index: block.index,
      nonce: block.nonce,
      difficulty: block.difficulty,
      timestamp: new Date(block.timestamp).toLocaleString(),
      previousHash: `${block.previousHash.slice(0, 15)}...`,
      hash: `${block.hash.slice(0, 15)}...`
    };
  });

  const columns = [
    {
      title: 'Index', key: 'index', dataIndex: 'index'
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
        <Button type="primary" onClick={() => {
          setBlockInfo(blockchain[record.index])
        }}>View detail</Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
        style={{ height: '370px', backgroundColor: 'white' }}
      />
      {(blockInfo.index !== undefined) && <Block blockInfo={blockInfo} />}
    </>
  );
};

export default Blockchain;





