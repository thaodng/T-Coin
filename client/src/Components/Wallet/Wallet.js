import React from 'react';

/* walletInfo: balance, publicKey */
const Wallet = ({ onCreateWallet, onGetWalletBalance, onCreateTransaction }) => {
  return (
    <div>
      <button style={{ width: 150, height: 150 }} onClick={onCreateWallet} >
        Create wallet
      </button>
      <button style={{ width: 150, height: 150 }} onClick={onGetWalletBalance} >
        Get wallet balance
      </button>
      <button style={{ width: 150, height: 150 }} onClick={onCreateTransaction} >
        Create transaction
      </button>
    </div>
  )
}

export default Wallet
