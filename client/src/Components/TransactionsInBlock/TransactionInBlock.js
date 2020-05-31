import React from 'react'
import CryptoLayout from '../CryptoLayout/CryptoLayout';
import Transaction from '../Transaction/Transaction';

const TransactionInBlock = () => {
  const data = Array(10).fill(0);

  return (
    <CryptoLayout>
      {data.map(item => <Transaction />)}
    </CryptoLayout>
  );
};

export default TransactionInBlock;
