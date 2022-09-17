import ws from 'ws';
import Chain from './chain';
import config from '../config/index';
import logger from '../utils/logger';
import { IncomingMessage } from 'http';
import Block from './block';

const mylog = logger;

class P2PServer extends Chain{
    private sockets: ws[];
    constructor(){
        super()
        this.sockets = [];
    }
    /**
     * p2p server listen
     */
    public listen() : void{
        const server = new ws.Server({port:config.P2P_PORT});
        server.on("connection",(socket,request)=>{
            mylog.http("WebSocket connected",{
                request : <IncomingMessage>request,
                socket : <ws.WebSocket>socket,
                method : <string> request.method,
                remoteAddress : <string> request.socket.remoteAddress,
                remotePort : <number> request.socket.remotePort,
            });
            this.connectSocket(socket);
            socket.on("message",(data)=>{
                const JsonMSG :SendMessage = JSON.parse(data.toString());
                if(JsonMSG.code === 1)
                    console.log(JsonMSG.msg);
                else if(JsonMSG.code === 0)
                    this.receiveBlock(JsonMSG.msg);
            });
        });
    }
    /**
     * Connect other peer
     * @param newPeer 
     */
    public connectToPeer(newPeer : string) : void{
        const socket : ws.WebSocket = new ws.WebSocket(newPeer);
        socket.on("open",()=>{
            this.connectSocket(socket);
        })
    }
    /**
     * Connect other Socket
     * @param socket 
     */
    public connectSocket(socket : ws.WebSocket){
        this.sockets.push(socket);
        socket.send({"code":1,"msg":`Success`});
    }
    /**
     * Announce add new block
     * @param block
     */
    public BroadcastingBlock(block : Block){
        for(let socket of this.sockets)
            socket.send({"code":0,"msg":JSON.stringify(block)});
    }

    public sendBlockChain(){
        const blockchain = this.getBlockChain();
    }

    private receiveBlock(msg :string) : EchoMessage{
        const block : Block = JSON.parse(msg);
        if(this.IsValidBlock(block)){
            this.addBlock(block);
            return {"IsValid" : true, "msg" : "Receive Valid Block"};
        }
        else
            return {"IsValid" : false, "msg" : "Invalid Block is exist"};
        
    }
    /**
     * Check new block is valid or not
     * @param block 
     * @returns 
     */
    private IsValidBlock(block : Block) : boolean{
        const LatestBlock = this.getLatestBlock();
        if(block.height - LatestBlock.height === 1 && block.preHash === LatestBlock.hash)
            return true;
        return false;
    }
    /**
     * Get Informations of Connection
     * @returns 
     */
    public getConnection() : ws[]{
        return JSON.parse(JSON.stringify(this.sockets));
    }
}

export default P2PServer;