import React from 'react'
import { Input, Form } from 'antd';
import { KeyOutlined, MoneyCollectOutlined, HomeOutlined } from '@ant-design/icons';

const CreateTransactionForm = ({}) => {

  return (
    <Form layout="vertical">
      <Form.Item rules={[{ required: true, message: 'Please input recipient address!', }]}>
        <Input prefix={<HomeOutlined />} placeholder="Recepient address" />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Please input amount!', }]}>
        <Input prefix={<MoneyCollectOutlined />} placeholder="Amount" />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Please input your private key!', }]}>
        <Input prefix={<KeyOutlined />} placeholder="Your private key" />
      </Form.Item>
    </Form>
  );
}


export default (CreateTransactionForm);
