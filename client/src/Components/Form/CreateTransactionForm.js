import React from 'react'
import { Input, Form } from 'antd';
import { KeyOutlined, MoneyCollectOutlined, HomeOutlined } from '@ant-design/icons';

const CreateTransactionForm = ({ setRecipientAddress, setAmount, setSenderPrivateKey }) => {

  return (
    <Form layout="vertical">
      <Form.Item rules={[{ required: true, message: 'Please input recipient address!', }]}>
        <Input
          onChange={(e) => setRecipientAddress(e.target.value)}
          prefix={<HomeOutlined />} placeholder="Recepient address" />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Please input amount!', }]}>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          prefix={<MoneyCollectOutlined />} placeholder="Amount" />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Please input your private key!', }]}>
        <Input
          onChange={(e) => setSenderPrivateKey(e.target.value)}
          prefix={<KeyOutlined />} placeholder="Your private key" />
      </Form.Item>
    </Form>
  );
}


export default (CreateTransactionForm);
