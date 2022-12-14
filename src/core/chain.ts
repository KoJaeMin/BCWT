import Block from './block';

class Chain{
    private blocks : Block[];
    constructor(){
        this.blocks = [];
    };
    /**
     * Get previous hash
     * @returns previous hash value
     */
    private getPreHash() : string{
        const len : number = this.getLength();
        return len === 0 ? "" : this.blocks[len - 1].hash;
    }
    /**
     * Add new Block in BlockChain
     * @param data 
     */
    public createBlock(data : string) : Block{
        const previousBlock = this.getLength() > 0 ? this.getLatestBlock():new Block('','',0,'',0);
        let newBlock = Block.generateBlock(previousBlock,data);
        while(this.getLatestBlock().height >= newBlock.height)
            newBlock = Block.generateBlock(this.getLatestBlock(),data);
        this.blocks.push(newBlock);
        return JSON.parse(JSON.stringify(newBlock));
    }
    protected addBlock(block : Block){
        this.blocks.push(block);
    }
    /**
     * Get Copy of BlockChain
     * @returns copy of BlockChain
     */
    public getBlockChain() : Block[]{
        return JSON.parse(JSON.stringify(this.blocks));
    }
    /**
     * Get Copy of Latest Block
     * @returns Copy of Latest Block
     */
    public getLatestBlock() : Block{
        return JSON.parse(JSON.stringify(this.blocks[this.blocks.length - 1]));
    }
    /**
     * Get the number of Blocks
     * @returns BlockChain length
     */
    public getLength() : number{
        return this.blocks.length;
    }
    /**
     * Get BlockChain Validation
     * @returns BlockChain Validation
     */
    public IsValid() : boolean{
        let validation = true;
        for(let i = 1; i < this.getLength();i++){
            if(this.blocks[i].preHash !== this.blocks[i-1].hash)
                validation = false;
        }
        return validation;
    }
}


export default Chain;