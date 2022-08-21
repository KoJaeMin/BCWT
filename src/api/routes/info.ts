import { Router, Request, Response, NextFunction } from "express";
import p2p from '../../core/p2p';

const route : Router = Router();

export default (app : Router , ws : p2p) =>{
    app.use('/info', route);

    route.get('/', (req : Request, res : Response)=>{
        /// Nothing
        res.send('Info api');
    });
    /**
     * 연결 정보 조회
     */
    route.get('/connection',(req : Request, res : Response)=>{
        res.json(ws.getConnection())
    })
    /**
     * blockchain 정보 조회
     */
    route.get('/blockchain', (req : Request, res : Response)=>{
        res.status(200).json(ws.getBlockChain())
    })
}