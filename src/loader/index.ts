import express from 'express';
import expressLoader from './expressLoader';
import p2p from '../core/p2p';


export default (app : express.Application , ws : p2p)=>{
    expressLoader(app , ws);
};