const Block = require('./Block.js');

class BlockChain {
  constructor(difficulty = 1) {
    this.blockChain = [];
    this.difficulty = difficulty;
    this.target = new Array(difficulty + 1).join('0');
  }

  addBlock(data) {
    const startTime = Date.now();
    let lastHash = '0'; // starting hash
    if (this.blockChain.length > 0) {
      lastHash = this.blockChain[this.blockChain.length - 1].hash;
    }
    const block = new Block(data, lastHash);
    block.mine(this.difficulty);
    this.blockChain.push(block);
    console.log('Time Taken to add block : ', Date.now() - startTime);
  }

  validateChain() {
    let currentBlock;
    let previousBlock;
    for (let i = 1; i < this.blockChain.length; i++) {
      currentBlock = this.blockChain[i];
      previousBlock = this.blockChain[i - 1];
      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash.substring(0, this.difficulty) !== this.target) {
        console.log('block was not mined');
        return false;
      }
    }
    return true;
  }
}

module.exports = BlockChain;
