import React, { useState } from 'react';
import { Table, Button, Modal, Badge, message } from 'antd';
import { DownSquareOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons';
import ImportForm from '../Form/ImportForm';
import CreateTransactionForm from '../Form/CreateTransactionForm';

const price = 1;

/* walletInfo: balance, publicKey */
const Wallet = ({ walletInfo, onCreateWallet, onGetWalletBalance, onCreateTransaction }) => {
  const [showImportModel, setShowImportModel] = useState(false);
  const [showCreateTxModel, setShowCreateTxModel] = useState(false);

  const handleReload = () => {

  };

  const handleCreate = (e) => {
    e.preventDefault();
    setShowImportModel(false);
    setShowCreateTxModel(false);
  };

  const handleCancel = () => {
    setShowImportModel(false);
    setShowCreateTxModel(false);
  };


  const data = [
    {
      address: "04a40e5847b0b3d5ea40d8aa178e9815ec0dabb1e53037bf47c6fdaf9cd5b7b6791efe255305b258b00852950a56cf412a70cfa8f2c1e10e782a3d697a76788112",
      amount: 100,
    },
    {
      address: "047b6041b26b6bee8740708a2b0774ccd2ff11608496a708ab735ca8ca03f79760df9a1d7323c55630c3de7cf43da6cd0d5b626bca9e2019860f0f874e224333ef",
      amount: 900
    },
    {
      address: "047b6041b26b6bee8740708a2b0774ccd2ff11608496a708ab735ca8ca03f79760df9a1d7323c55630c3de7cf43da6cd0d5b626bca9e2019860f0f874e224333ef",
      amount: 900
    },
    {
      address: "047b6041b26b6bee8740708a2b0774ccd2ff11608496a708ab735ca8ca03f79760df9a1d7323c55630c3de7cf43da6cd0d5b626bca9e2019860f0f874e224333ef",
      amount: 900
    },
  ]

  const columns = [
    {
      title: 'Recipient address', key: 'address', dataIndex: 'address'
    },
    { title: 'Amount', key: 'amount', dataIndex: 'amount' },
    {
      title: 'Status', key: 'status', render: (text, record) => (
        <Badge status="processing" text="processing" />
      ),
    },
  ];


  const formatAmount = (amount) => {
    const nf = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return nf.format(amount);
  };

  return (
    <div className="Wallet">
      <div style={{ marginBottom: '12px' }}>
        <Button
          type="primary"
          icon={<DownSquareOutlined />}
          onClick={() => setShowImportModel(true)}>Import
        </Button>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ marginLeft: '8px' }}
          onClick={onCreateWallet}>Create wallet
        </Button>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ marginLeft: '8px' }}
          onClick={() => setShowCreateTxModel(true)}>Create transaction
        </Button>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          shape="circle"
          style={{ marginLeft: '8px' }}
          onClick={onGetWalletBalance} />
      </div>
      <Modal
        title="Import Wallet"
        visible={showImportModel}
        okText="Create"
        onCancel={handleCancel}
        onOk={handleCreate}>
        <ImportForm />
      </Modal>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ height: '300px', backgroundColor: 'white' }} />
      <Modal
        title="Send Money"
        visible={showCreateTxModel}
        okText="Send"
        onCancel={handleCancel}
        confirmLoading={handleReload}
        onOk={handleCreate}>
        <CreateTransactionForm />
      </Modal>


      <div style={{ marginTop: '24px' }}>
        <h3>Total: {`${formatAmount(walletInfo.balance * price)}`}</h3>
        <span>{`(at ${formatAmount(price)} per T-Coin)`}</span>
      </div>
    </div>
  )
}

export default Wallet
