import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  GET_BLOCKCHAIN_URL
} from '../../config';

const Blockchain = props => {
  // get blockchain network
  const [blockchain, setBlockchain] = useState([]);
  
  const getBlockchain = async () => {
    const { data: { blockchain } } = await axios.get(`${GET_BLOCKCHAIN_URL}`);
    setBlockchain(blockchain);
  };

  useEffect(() => {
    getBlockchain();
  }, [])

  return (
    <div>
      Blockchain
      {/* blockchain */}
    </div>
  )
}

export default Blockchain;
