import { Router, Request, Response, NextFunction } from "express";
import p2p from '../../core/p2p';

const route : Router = Router();

export default (app : Router , p2p : p2p) =>{
    app.use('/p2p', route);

    route.get('/', (req : Request, res : Response)=>{
        /// nothing
    });

    route.post('/', (req : Request, res : Response)=>{
        /// p2p 서버 연결
        const { peer } = req.body;
        p2p.connectToPeer(peer)
    })
    route.post('/blockchain',(req : Request, res : Response)=>{
        const { data } = req.body;
        const newBlock = p2p.addBlock(data);
        res.json(newBlock)
    })
}