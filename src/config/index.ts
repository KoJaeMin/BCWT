import 'dotenv/config';
import process from 'process';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default{
    SERVER_PORT : <number> Number(process.env.SERVER_PORT),
    P2P_PORT : <number> Number(process.env.P2P_PORT),
    HASH_ALGORITHM : <string>process.env.HASH_ALGORITHM,
    API : {
        prefix : <string>'/api'
    }
}