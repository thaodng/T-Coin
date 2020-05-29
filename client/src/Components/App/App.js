import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CREATE_WALLET_URL } from '../../config';
import './App.css';

const App = () => {
  console.log(process.env);
  const createWallet = async () => {
    const { data } = await axios.post(`${CREATE_WALLET_URL}/`);
    console.log(CREATE_WALLET_URL);
  };

  return (
    <div className="App">
      <button style={{ width: 50, height: 50 }} onClick={() => createWallet()} >
        Create wallet
      </button>
    </div>
  );
}

export default App;
