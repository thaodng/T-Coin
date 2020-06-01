import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Badge, message } from 'antd';
import { DownSquareOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import ImportForm from '../Form/ImportForm';
import CreateTransactionForm from '../Form/CreateTransactionForm';

import {
  GET_WALLET_BALANCE_URL,
  CREATE_TRANSACTION,
} from '../../config';

const price = 1;

/* walletInfo: balance, publicKey */
const Wallet = ({ walletInfo, setWalletInfo,dataWalletTransactions, setDataWalletTransactions }) => {
  const history = useHistory();
  const [publicKey, setPublicKey] = useState('');

  const [showImportModel, setShowImportModel] = useState(false);
  // get wallet balance === login
  const getWallet = async ({ publicKey }) => {
    const { data: { balance } } = await axios.post(`${GET_WALLET_BALANCE_URL}/`, { publicKey });
    const wallet = { publicKey, balance };
    setWalletInfo(wallet);
  };

  const handleImport = (e) => {
    e.preventDefault();
    setShowImportModel(false);
    getWallet({ publicKey });
    message.info('Import public key success');
  };

  const handleCancelImport = () => {
    setShowImportModel(false);
  }

  const [showCreateTxModel, setShowCreateTxModel] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [senderPrivateKey, setSenderPrivateKey] = useState('');

  const createTransaction = async ({ recipientAddress, amount, senderPrivateKey }) => {
    const { data: { transaction } } = await axios
      .post(`${CREATE_TRANSACTION}/`, {
        recipientAddress,
        amount,
        senderAddress: walletInfo.publicKey,
        senderPrivateKey
      });

    const recipients = Object.keys(transaction.txOuts);
    const transactions = recipients
      .map(recipient => {
        return {
          key: recipient,
          address: recipient,
          amount: transaction.txOuts[recipient]
        }
      });

    console.log(transactions);
    setDataWalletTransactions(dataTrans => dataTrans.concat(transactions));
    // we call get transaction-pool every x - seconds, so in the future, using socket.io here
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setShowCreateTxModel(false);
    createTransaction({
      recipientAddress,
      amount,
      senderAddress: walletInfo.publicKey,
      senderPrivateKey
    });
    message.info('Create transaction success');

  };

  const handleCancel = () => {
    setShowCreateTxModel(false);
  };

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
          onClick={() => history.push('/create-success')}>Create wallet
        </Button>
        {
          walletInfo.publicKey && (
            <>
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
                onClick={() => getWallet({ publicKey })} />
            </>
          )
        }
      </div>
      <Modal
        title="Import Wallet"
        visible={showImportModel}
        okText="Import"
        onCancel={handleCancelImport}
        onOk={handleImport}>
        <ImportForm setPublicKey={setPublicKey} />
      </Modal>
      <Modal
        title="Send Money"
        visible={showCreateTxModel}
        okText="Send"
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <CreateTransactionForm setRecipientAddress={setRecipientAddress} setAmount={setAmount} setSenderPrivateKey={setSenderPrivateKey} />
      </Modal>

      <Table
        columns={columns}
        dataSource={dataWalletTransactions}
        pagination={false}
        style={{ height: '300px', backgroundColor: 'white' }}
      />
      {walletInfo.balance && (
        <div style={{ marginTop: '24px' }}>
          <h3>Address: {walletInfo.publicKey}</h3>
          <h3>Total: {`${formatAmount(walletInfo.balance * price)}`}</h3>
          <span>{`(at ${formatAmount(price)} per T-Coin)`}</span>
        </div>
      )}
    </div >
  )
}

export default Wallet
