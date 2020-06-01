import React from 'react'
import { Descriptions, Badge } from 'antd';

const Transaction = ({ transactionData, status }) => {
  const { id, txOuts, txIn } = transactionData;
  const { timestamp, senderAddress, amount } = txIn;
  const time = new Date(timestamp).toLocaleString();

  const sender = senderAddress.length > 64 ? `${senderAddress.slice(64)}...` : senderAddress;

  return (
    <Descriptions title="Transaction Info" bordered style={{ backgroundColor: 'white' }}>
      <Descriptions.Item span="3" label="Transaction Hash: ">{id}</Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        {
          status === 'processing' ? <Badge status="processing" text="processing" /> : <Badge status="success" text="success" />
        }
      </Descriptions.Item>
      <Descriptions.Item label="Timestamp" span={3}>{time}</Descriptions.Item>
      <Descriptions.Item label="From" span={2}>{sender}</Descriptions.Item>
      <Descriptions.Item label="Balance" span={1}>{amount}</Descriptions.Item>
      {
        Object.keys(txOuts).map(recipientAddress => {
          return (
            <>
              <Descriptions.Item label="To" span={2}>{`${recipientAddress.slice(64)}...`}</Descriptions.Item>
              <Descriptions.Item label="Amount" span={1}>{txOuts[recipientAddress]}</Descriptions.Item>
            </>
          );
        })
      }
    </Descriptions>
  )
}

export default Transaction
