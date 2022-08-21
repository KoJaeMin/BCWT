import { Router } from "express";
import p2p from '../core/p2p';
import connect from "./routes/p2p";
import info from './routes/info';

export default (ws : p2p) => {
    const route = Router();
    
    connect(route, ws);
    info(route, ws);
    
    return route;
}