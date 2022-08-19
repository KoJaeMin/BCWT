import express from 'express';
import p2p from '../core/p2p';
import routes from '../api/index';
import config from '../config/index'

export default (app :express.Application) =>{
    app.use(config.API.prefix,routes());
}