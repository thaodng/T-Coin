import React from 'react'

const TransactionPool = ({ transactions, onMineBlock }) => {
  console.log(transactions);
  return (
    <div>
      <p>TransactionPool</p>
      <button style={{ width: 150, height: 150 }} onClick={onMineBlock} >
        Mine new block
      </button>
    </div>
  );
};

export default TransactionPool
