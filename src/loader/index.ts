import express from 'express';
import expressLoader from './expressLoader';


export default (app : express.Application)=>{
    expressLoader(app);
};