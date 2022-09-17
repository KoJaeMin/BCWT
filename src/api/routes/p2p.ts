import { Router, Request, Response, NextFunction } from "express";
import p2p from '../../core/p2p';

const route : Router = Router();

export default (app : Router , ws : p2p) =>{
    app.use('/p2p', route);

    route.get('/', (req : Request, res : Response)=>{
        /// nothing
    });

    route.post('/', (req : Request, res : Response)=>{
        /// p2p 서버 연결
        const { peer } = req.body;
        ws.connectToPeer(peer)
    })
    route.post('/blockchain',(req : Request, res : Response)=>{
        const { data } = req.body;
        const newBlock = ws.createBlock(data);
        ws.BroadcastingBlock(newBlock);
        // broadcasting으로 모든 소켓에 
        // p2p.broadcasting()
        res.json(newBlock)
    })
}