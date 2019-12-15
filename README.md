# BlockChain  ![Version][version-image]

![Linux Build][linuxbuild-image]
![Windows Build][windowsbuild-image]
![NSP Status][nspstatus-image]
![Test Coverage][coverage-image]
![Dependency Status][dependency-image]
![devDependencies Status][devdependency-image]

The quickest way to get started with BlockChain implementation in JavaScript, just clone the project:

```bash
$ git clone https://github.com/arjunkhetia/BlockChain.git
```

Install dependencies:

```bash
$ npm install
```

To execute the blockchain application run:

```bash
$ npm start
```

The app will show results in console itself.

# BlockChain

A blockchain, originally block chain, is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. By design, a blockchain is resistant to modification of the data. It is "an open, distributed ledger that can record transactions between two parties efficiently and in a verifiable and permanent way".

## Block

Block is a data structure used for keeping a set of transactions which is distributed to all nodes in the network.

```js
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
```

![Block](https://github.com/arjunkhetia/BlockChain/blob/master/block.png "Block")

## Chain

Chain a sequence of blocks in a specific order.

```js
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
```

![Chain](https://github.com/arjunkhetia/BlockChain/blob/master/chain.png "Chain")

[version-image]: https://img.shields.io/badge/Version-1.0.0-orange.svg
[linuxbuild-image]: https://img.shields.io/badge/Linux-passing-brightgreen.svg
[windowsbuild-image]: https://img.shields.io/badge/Windows-passing-brightgreen.svg
[nspstatus-image]: https://img.shields.io/badge/nsp-no_known_vulns-blue.svg
[coverage-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[dependency-image]: https://img.shields.io/badge/dependencies-up_to_date-brightgreen.svg
[devdependency-image]: https://img.shields.io/badge/devdependencies-up_to_date-yellow.svg
