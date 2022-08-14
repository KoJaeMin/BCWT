import * as crypto from 'crypto';

interface BlockShape{
    hash : string,
    preHash : string,
    height : number,
    data : string,
    timestamp: number
}

class Block implements BlockShape{
    public hash: string;
    public timestamp: number;
    constructor(
        public preHash : string,
        public height : number,
        public data : string
    ){
        this.hash = Block.calculateHash(this.preHash,this.height,this.data,this.timestamp);
        this.timestamp = Date.now();
    }
    static calculateHash(preHash:string, height : number, data:string, timestamp : number) : string{
        const toHash = `${preHash}${height}${data}${timestamp}`;
        return crypto.createHash('sha256').update(toHash).digest("hex");
    }
}

export {Block};