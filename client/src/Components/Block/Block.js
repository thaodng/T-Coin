import React from 'react'
import { Descriptions } from 'antd';
import { Link } from 'react-router-dom';


const Block = ({ blockInfo }) => {
  const { index, nonce, difficulty, timestamp, data } = blockInfo;
  const rewardTransaction = data[data.length - 1];
  const { txOuts } = rewardTransaction;
  const address = (Object.keys(txOuts)[0]);
  const amount = txOuts[address] ;

  return (
    <>
      <Descriptions title="Block Info" bordered style={{ backgroundColor: 'white' }}>
        <Descriptions.Item span="3" label="Block index: ">{index}</Descriptions.Item>
        <Descriptions.Item span="3" label="Nonce">{nonce}</Descriptions.Item>
        <Descriptions.Item span="3" label="Difficulty">{difficulty}</Descriptions.Item>
        <Descriptions.Item span="3" label="Timestamp">{new Date(timestamp).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item span="3" label="Mined by">{address}</Descriptions.Item>
        <Descriptions.Item span="3" label="Reward for miner"> {`${amount} TCoin`} </Descriptions.Item>
        <Descriptions.Item span="3">
          <Link to={{
            pathname: '/transactions',
            state: { transactions: data }
          }}>
            Show detail transactions in this block
          </Link>
        </Descriptions.Item>
      </Descriptions>
      {/* <Button type="primary" style={{ marginTop: '12px' }} block onClick={() => { console.log('a') }}>Show detail transactions in this block</Button> */}
    </>
  )
};

export default Block
