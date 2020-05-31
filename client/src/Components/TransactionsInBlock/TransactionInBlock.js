import React from 'react'
import { useHistory } from "react-router-dom";

const TransactionInBlock = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push('/');
  }

  return (
    <button type="button" onClick={handleClick}>
      Go blockchain page
    </button>
  )
}

export default TransactionInBlock;
