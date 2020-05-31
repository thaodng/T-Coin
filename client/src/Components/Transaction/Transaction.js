import React from 'react'
import { Descriptions, Badge } from 'antd';

const Transaction = () => {
  return (
    <Descriptions title="Transaction Info" bordered style={{ backgroundColor: 'white' }}>
      <Descriptions.Item span="3" label="Transaction Hash: ">0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b </Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        <Badge status="processing" text="processing" />
      </Descriptions.Item>
      <Descriptions.Item label="Timestamp" span={3}>2018-04-24 18:00:00</Descriptions.Item>
      <Descriptions.Item label="From" span={2}>0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b</Descriptions.Item>
      <Descriptions.Item label="Balance" span={1}>1000$</Descriptions.Item>
      <Descriptions.Item label="To" span={2}>0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b</Descriptions.Item>
      <Descriptions.Item label="Amount" span={1}>50</Descriptions.Item>
      <Descriptions.Item label="To" span={2}>0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b</Descriptions.Item>
      <Descriptions.Item label="Amount" span={1}>50</Descriptions.Item>
      <Descriptions.Item label="To" span={2}>0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b</Descriptions.Item>
      <Descriptions.Item label="Amount" span={1}>50</Descriptions.Item>
      <Descriptions.Item label="To" span={2}>0x42543e8cfd7e5fb1b9be52e3d0397bf2be599921121fa1f8bba7f8202b17ed6b</Descriptions.Item>
      <Descriptions.Item label="Amount" span={1}>50</Descriptions.Item>
    </Descriptions>
  )
}

export default Transaction
