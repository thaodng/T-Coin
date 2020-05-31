import React from 'react';
import { Result, Button, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import CryptoLayout from '../CryptoLayout/CryptoLayout';

import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const CreateSuccess = () => {
  const history = useHistory();
  return (
    <CryptoLayout>
      <Result
        status="success"
        title="Successfully Create wallet"
        extra={[
          <Button type="primary" key="console" onClick={() => history.push('/')}>
            I have saved my private key in safe place. Go to wallet
          </Button>
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text strong style={{fontSize: 16,}}>
              We don't save your private. Please keep it in safe place
            </Text>
          </Paragraph>
          <Paragraph>
            Your public key: 044dbef0735d813140fea1baed46a6dc0644303ed87d386550646bce087ef57fbe7cbfc5e0893733c95fff8bce71a0add50f745e6fb3be0e37f9d5ac62dcd8af3b
          </Paragraph>
          <Paragraph>
            Your private key: 7be37fc9457c77dc8ae41160acef06fdd2f5e8e59c52d524578a9608e424507e
          </Paragraph>
        </div>
      </Result>
    </CryptoLayout >
  );
};

export default CreateSuccess
