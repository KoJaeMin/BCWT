import express from 'express';
import p2p from '../core/p2p';
import routes from '../api/index';
import config from '../config/index'

export default (app :express.Application, ws : p2p) =>{
    app.use(express.json());
    app.use(config.API.prefix, routes(ws));
}
