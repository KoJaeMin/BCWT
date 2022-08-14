import {Block} from './block';

class Chain{
    private blocks : Block[];
    constructor(){
        this.blocks = [];
    };
    private getPreHash() : string{
        return this.blocks.length === 0 ? "" : this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data : string) : void{
        const newBlock = new Block(this.getPreHash(),this.blocks.length+1,data);
        this.blocks.push(newBlock);
    }
    public getBlockChain() : Object{
        return JSON.parse(JSON.stringify(this.blocks));
    }
    public getLatestBlock() : Object{
        return JSON.stringify(this.blocks[this.blocks.length - 1]);
    }
    public getLength() : number{
        return this.blocks.length;
    }
}


export {Chain}