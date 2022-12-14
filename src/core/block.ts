import crypto from 'crypto';
import config from '../config/index';
import hexToBinary from "hex-to-binary";

class Block implements BlockShape{
    
    public timestamp: number;
    public difficulty: number;
    constructor(
        /**
         * BlockChain의 무결성을 위하여 preHash값을 가진다.
         */
        public hash: string,
        public preHash : string,
        public height : number,
        public data : string,
        public nonce : number
    ){
        this.timestamp = Date.now();
        this.difficulty = this.getDifficulty();
    }
    /**
     * Generate hash
     * @param preHash previos hash value
     * @param height the number of block
     * @param data data
     * @param timestamp time when block made
     * @returns hash value
     */
    private static generateHash(preHash:string, height : number, data:string,timestamp:number, nonce:number) : string{
        /// crypto.randomBytes(16).toString('hex')를 이용하여 Salt사용
        const toHash = `${preHash}${height}${data}${timestamp}${nonce}${crypto.randomBytes(16).toString('hex')}`;
        return crypto.createHash(config.HASH_ALGORITHM).update(toHash).digest("hex");
    }
    public getDifficulty():number{
        const len : number = this.height.toString(2).length;
        return this.height > 1 ?Math.floor(Math.log1p(this.height)/Math.log1p(len))-Math.floor(Math.atan(this.height)): 0;
    }
    public static generateBlock(previosBlock : Block, data:string) : Block{
        const generation : Block = new Block('',previosBlock.hash,previosBlock.height+1,data,0);
        const newer : Block = Block.getNonce(generation);
        return newer;
    }
    /**
     * Minig
     * @param block 
     * @returns 
     */
    public static getNonce(block : Block) : Block{
        let hash : string;
        let nonce : number = 0;
        while(true){
            nonce++;
            block.nonce = nonce;
            hash = Block.generateHash(block.preHash,block.height,block.data,block.timestamp,block.nonce);
            const binary : string = hexToBinary(hash);
            const result : boolean = binary.startsWith('0'.repeat(block.difficulty));
            if(result){
                block.hash = hash;
                return block;
            }
        }
    }
}

export default Block;