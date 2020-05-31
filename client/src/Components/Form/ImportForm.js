import React from 'react'
import { Input, Form } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

const ImportForm = ({}) => {

  return (
    <Form layout="vertical">
      <Form.Item rules={[{ required: true, message: 'Please input your public key!',}]}>
        <Input prefix={<KeyOutlined />} placeholder="Public key" />
      </Form.Item>
    </Form>
  );
}


export default (ImportForm);
