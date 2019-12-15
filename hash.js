let hash = require('object-hash');

class Hash {

  constructor() {}

  calculateHash = (index, timeStamp, data, previousHash, nonce) => {
    return hash({
      index: index,
      timeStamp: timeStamp,
      data: data,
      previousHash: previousHash,
      nonce: nonce
    });
  }

}

module.exports = Hash;
