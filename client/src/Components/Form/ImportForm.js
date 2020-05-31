import React, { useState } from 'react'
import { Input, Form } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

const ImportForm = ({ setPublicKey }) => {

  return (
    <Form layout="vertical">
      <Form.Item rules={[{ required: true, message: 'Please input your public key!', }]}>
        <Input
          prefix={<KeyOutlined />}
          placeholder="Public key"
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </Form.Item>
    </Form>
  );
}


export default (ImportForm);
