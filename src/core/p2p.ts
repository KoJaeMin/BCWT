import ws from 'ws';
import Chain from './chain';
import config from '../config/index';
<<<<<<< HEAD
import logger from '../utills/logger';
=======
import logger from '../utils/logger';
>>>>>>> logger
import { IncomingMessage } from 'http';

const mylog = logger;

class P2PServer extends Chain{
    private sockets: ws[];
    constructor(){
        super()
        this.sockets = [];
    }

    private listen() : void{
        const server = new ws.Server({port:config.SERVER_PORT});
        server.on("connection",(socket,request)=>{
            mylog.http("WebSocket connected",{
                request : <IncomingMessage>request,
                socket : <ws.WebSocket>socket,
                method : <string> request.method,
                remoteAddress : <string> request.socket.remoteAddress,
                remotePort : <number> request.socket.remotePort,
            });
            this.connectSocket(socket);
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
        socket.on("message",(data : string)=>{
            mylog.info(data ,{
                protocol : <string> socket.protocol,
                url : <string> socket.url
            });
        })
        socket.send(`Success`);
    }
}

export default P2PServer;