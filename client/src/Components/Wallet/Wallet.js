import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
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

  const columns = [
    {
      title: 'Address', key: 'address', dataIndex: 'address'
    },
    { title: 'Tcoins', key: 'coins', dataIndex: 'coin' },
    {
      title: 'Status', key: 'status', dataIndex: 'true'
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
        dataSource={[walletInfo]}
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
        <h5>Total: {`${formatAmount(walletInfo.balance * price)}`}</h5>
        <span>{`(at ${formatAmount(price)} per T-Coin)`}</span>
      </div>
    </div>
  )
}

export default Wallet
