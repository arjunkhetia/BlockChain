let Hash = require('./hash');

class Block {

  constructor(index, timeStamp, data, previousHash) {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = new Hash().calculateHash(index, timeStamp, data, previousHash, 0);
    this.nonce = 0;
  }

  createGenesisBlock() {
    return new Block(0, 638586300000, {
      block: 'Genesis Block'
    }, 0);
  }

  mineBlock(block, difficulty) {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      block.nonce++;
      block.hash = new Hash().calculateHash({
        index: block.index,
        timeStamp: block.timeStamp,
        data: block.data,
        previousHash: block.previousHash,
        nonce: block.nonce
      });
    }
    return block;
  }

}

module.exports = Block;
