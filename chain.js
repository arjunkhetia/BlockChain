let Hash = require('./hash');
let Block = require('./block');

class Chain {

  constructor() {
    this.chain = [new Block().createGenesisBlock()];
    this.difficulty = 2;
  }

  addBlock(block) {
    block['previousHash'] = this.getLastBlock().hash;
    block = new Block().mineBlock(block, this.difficulty);
    this.chain.push(block);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
      if (currentBlock['hash'] !== new Hash().calculateHash({
          index: currentBlock['index'],
          timeStamp: currentBlock['timeStamp'],
          data: currentBlock['data'],
          previousHash: currentBlock['previousHash'],
          nonce: currentBlock['nonce']
        })) {
        return false;
      }
      if (currentBlock['previousHash'] !== previousBlock['hash']) {
        return false;
      }
    }
    return true;
  }

}

module.exports = Chain;
