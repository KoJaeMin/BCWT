import 'dotenv/config';
import * as process from 'process';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default{
    PORT : <number>Number(process.env.PORT),
    HASH_ALGORITHM : <string>process.env.HASH_ALGORITHM
}