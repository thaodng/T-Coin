const ec = require('../../utils/ec');
const { STARTED_CAPITAL } = require('../../config');

class Wallet {
  constructor({ publicKey }) {
    this.balance = STARTED_CAPITAL;
    this.publicKey = publicKey; // only save publicKey(address)
  }

  // sign on hash <-> encrypt data by privateKey
  sign({ data, privateKey }) {
    const keyPair = ec.keyFromPrivate(privateKey);
    return keyPair.sign(cryptoHash(data));
  }
}

module.exports = Wallet;