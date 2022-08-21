import express from 'express';
import loader from './src/loader/index';
import config from './src/config/index';
import P2PServer from './src/core/p2p';

const app : express.Application = express();
const ws = new P2PServer();

loader(app , ws);

const server = app.listen(config.SERVER_PORT,()=>{console.log(`server onload # port: ${config.SERVER_PORT}`)})