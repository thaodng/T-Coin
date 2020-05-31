import React from 'react'
import { Table, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import Transaction from '../Transaction/Transaction';

const TransactionPool = ({ transactions, onMineBlock }) => {
  console.log(transactions);

  const data = [
    {
      id: 'c988e0ae-4638-413c-b7a9-4516f333430a',
      timestamp: '2018-04-24 18:00:00',
      senderAddress: "044edd95ed815bdfa329c9ab78cf40d8612fd062ff9333b5c6d4a098bb867c93e80dad39b582ff1b5bb1f26c0143a5106186de8f3efba0a1e36d6fbb3e6b946189".slice(0, 64) + "...",
      amount: 10000,
    },
    {
      id: 'c988e0ae-4638-413c-b7a9-4516f333430a',
      timestamp: '2018-04-24 18:00:00',
      senderAddress: "044edd95ed815bdfa329c9ab78cf40d8612fd062ff9333b5c6d4a098bb867c93e80dad39b582ff1b5bb1f26c0143a5106186de8f3efba0a1e36d6fbb3e6b946189".slice(0, 64) + "...",
      amount: 10000,
    },
    {
      id: 'c988e0ae-4638-413c-b7a9-4516f333430a',
      timestamp: '2018-04-24 18:00:00',
      senderAddress: "044edd95ed815bdfa329c9ab78cf40d8612fd062ff9333b5c6d4a098bb867c93e80dad39b582ff1b5bb1f26c0143a5106186de8f3efba0a1e36d6fbb3e6b946189".slice(0, 64) + "...",
      amount: 10000,
    },
  ];

  const columns = [
    {
      title: 'Transaction Id', key: 'id', dataIndex: 'id'
    },
    {
      title: 'Timestamp', key: 'timestamp', dataIndex: 'timestamp'
    },
    { title: 'Sender address', key: 'address', dataIndex: 'senderAddress' },
    {
      title: 'Sender balance', key: 'balance', dataIndex: 'amount'
    },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <Button type="primary" onClick={() => { console.log('a') }}>View detail</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ height: '370px', backgroundColor: 'white' }} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '12px', marginBottom: '12px' }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={onMineBlock}>Mine transactions
        </Button>
      </div>
      {<Transaction />}
    </div>
  );
};

export default TransactionPool
