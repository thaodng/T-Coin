import React from 'react'
import { Descriptions, Button } from 'antd';

const Block = () => {

  return (
    <Descriptions title="Block Info" bordered style={{ backgroundColor: 'white' }}>
      <Descriptions.Item span="3" label="Block index: ">0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b </Descriptions.Item>
      <Descriptions.Item span="3" label="Nonce">20202</Descriptions.Item>
      <Descriptions.Item span="3" label="Difficulty">15</Descriptions.Item>
      <Descriptions.Item span="3" label="Timestamp">2018-04-24 18:00:00</Descriptions.Item>
      <Descriptions.Item span="3" label="Mined by">That miner</Descriptions.Item>
      <Descriptions.Item span="3" label="Reward for miner"> 100 Tcoins </Descriptions.Item>
      <Descriptions.Item span="3" label="Transactions">100 Transactions</Descriptions.Item>
      <Descriptions.Item span="2" >
        <Button type="primary" onClick={() => { console.log('a') }}>Show detail transactions in block</Button>
      </Descriptions.Item>
    </Descriptions>
  )
};

export default Block
