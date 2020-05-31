import React from 'react'
import CryptoLayout from '../CryptoLayout/CryptoLayout';
import Transaction from '../Transaction/Transaction';

const TransactionInBlock = (props) => {
  const { transactions } = props.location.state;
  return (
    <CryptoLayout>
        {transactions.map(transaction => <Transaction transactionData={transaction} />)}
    </CryptoLayout>
  );
};

export default TransactionInBlock;
