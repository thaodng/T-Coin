import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  CREATE_WALLET_URL,
  GET_WALLET_BALANCE_URL,
  CREATE_TRANSACTION,
} from '../../config';

/* walletInfo: balance, publicKey */

const Wallet = () => {
  // create wallet === create account
  const [walletInfo, setWalletInfo] = useState({
    "balance": 1000,
    "publicKey": "04662d60cd721116a3370793d28762164e8a5d4f2505d17754f0a8670ccc9ed42cf5447a9d559621e7fcdd3a5ecbd139490545986603ec7a45b806bb70eaf10fa1"
  });


  const createWallet = async () => {
    const { data: { wallet } } = await axios.post(`${CREATE_WALLET_URL}/`);
    setWalletInfo(wallet);
  };

  // get wallet balance === login
  const getWalletBalance = async ({ publicKey }) => {
    const { data: { balance } } = await axios.post(`${GET_WALLET_BALANCE_URL}/`, { publicKey });
    const wallet = { publicKey, balance };
    setWalletInfo(wallet);
  };


  // create transaction
  const [recipientAddress, setRecipientAddress] = useState('foo');
  const [amount, setAmount] = useState(100);

  const createTransaction = async ({ recipientAddress, amount, senderPrivateKey }) => {
    const { data: { transaction } } = await axios
      .post(`${CREATE_TRANSACTION}/`, {
        recipientAddress,
        amount,
        senderAddress: walletInfo.publicKey,
        senderPrivateKey
      });

    // go to transaction pool UI
    console.log(transaction);

    // we call get transaction-pool every x - seconds, so in the future, using socket.io here
  };


  return (
    <div>
      <button style={{ width: 150, height: 150 }} onClick={() => createWallet()} >
        Create wallet
                </button>
      <button style={{ width: 150, height: 150 }} onClick={() => getWalletBalance({ publicKey: walletInfo.publicKey })} >
        Get wallet balance
                </button>
      <button style={{ width: 150, height: 150 }} onClick={() => createTransaction({
        recipientAddress: recipientAddress,
        amount: amount,
        senderPrivateKey: '5c359bc01562813fc348622a9027c89432758c2e6f481b0490b8347edcc649fc'
      })} >
        Create transaction
      </button>
    </div>
  )
}

export default Wallet
