let Block = require('./block');
let Chain = require('./chain');

let chain = new Chain();
console.log(JSON.stringify(chain, null, 2));
console.log('-------------------------------------------');

let block = new Block(1, Date.now(), { name: 'Arjun Khetia' }, chain.getLastBlock().hash);
console.log(block);
console.log('-------------------------------------------');

chain.addBlock(block);
console.log(JSON.stringify(chain, null, 2));
console.log('-------------------------------------------');

console.log('Chain is Valid : ', chain.isChainValid());
