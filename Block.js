const sha256 = require('js-sha256');

class Block {
  constructor(data, previousHash) {
    this.data = data;
    this.previousHash = previousHash;
    this.timeStamp = Date.now();
    this.nonce = 0;
    this.hash = this.generateHash();
  }

  generateHash() {
    return sha256(this.previousHash + this.timeStamp + this.data + this.nonce);
  }

  mine(difficulty) {
    const target = new Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++; // keep trying different nonce until you get a hit
      this.hash = this.generateHash();
    }
  }
}

module.exports = Block;
