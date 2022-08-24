import ws from 'ws';
import Chain from './chain';
import config from '../config/index';
import logger from '../utils/logger';
import { IncomingMessage } from 'http';

const mylog = logger;

class P2PServer extends Chain{
    private sockets: ws[];
    constructor(){
        super()
        this.sockets = [];
    }

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
            this.broadcasting(socket);
        });
    }
    
    public connectToPeer(newPeer : string) : void{
        const socket : ws.WebSocket = new ws.WebSocket(newPeer);
        socket.on("open",()=>{
            this.connectSocket(socket);
        })
    }

    public connectSocket(socket : ws.WebSocket){
        this.sockets.push(socket);
        socket.send(`Success`);
    }

    public broadcasting(socket : ws.WebSocket){
        socket.on("message",(data : string)=>{
            const socketno : number = this.sockets.findIndex((index)=> index===socket);
            for(let i in this.sockets){
                if(Number(i)!==socketno)
                    this.sockets[i].send(data);
            }      
        })
    }

    public getConnection() : ws[]{
        return JSON.parse(JSON.stringify(this.sockets));
    }
}

export default P2PServer;