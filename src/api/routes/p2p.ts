import { Router, Request, Response, NextFunction } from "express";
import p2p from '../../core/p2p';

const route : Router = Router();

export default (app : Router , ws : p2p) =>{
    app.use('/p2p', route);

    route.get('/', (req : Request, res : Response)=>{
        /// Nothing
    });

    route.post('/', (req : Request, res : Response)=>{
        /// p2p 서버 연결
        res.status(200).json()
    })
}