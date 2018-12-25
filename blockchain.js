const Block = require("./block");

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 4;
    }

    createGenesis() {
        return new Block("Tue Dec 25 2018 12:00:55 GMT+0100 (CET)", "Chain genesis block", "0");
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        const latestBlock = this.latestBlock();
        newBlock.index = latestBlock.index + 1;
        newBlock.previousHash = latestBlock.hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;

    }
}

module.exports = Blockchain;