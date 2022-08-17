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
    public addBlock(data : string) : void{
        const newBlock = Block.generateBlock(this.getLatestBlock(),data);
        this.blocks.push(newBlock);
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
    public IsValid() : boolean{
        let validation = true;
        for(let i = 1; i < this.getLength();i++){
            if(this.blocks[i].preHash !== this.blocks[i].hash)
                validation = false;
        }
        return validation;
    }
}


export default Chain;