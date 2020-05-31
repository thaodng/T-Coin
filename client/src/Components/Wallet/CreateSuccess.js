import React, { useEffect, useState } from 'react';
import { Result, Button, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CryptoLayout from '../CryptoLayout/CryptoLayout';
import { CREATE_WALLET_URL } from '../../config';

const { Paragraph, Text } = Typography;

const CreateSuccess = () => {
  const history = useHistory();
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data: { wallet, privateKey } } = await axios.post(`${CREATE_WALLET_URL}/`);
      setPublicKey(wallet.publicKey);
      setPrivateKey(privateKey);
    }
    getData();
  }, [])


  return (
    <CryptoLayout>
      <Result
        status="success"
        title="Successfully Create wallet"
        extra={[
          <Button type="primary" key="console" onClick={() => history.goBack()}>
            I have saved my private key in safe place. Go to wallet
          </Button>
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text strong style={{ fontSize: 16, }}>
              We don't save your private. Please keep it in safe place
            </Text>
          </Paragraph>
          <Paragraph>
            Your public key: {`${publicKey}`}
          </Paragraph>
          <Paragraph>
            Your private key: {`${privateKey}`}
          </Paragraph>
        </div>
      </Result>
    </CryptoLayout >
  );
};

export default CreateSuccess
