import { format } from "path";
import winston from "winston";

const logger : winston.Logger = winston.createLogger({
    level : 'info',
    format : winston.format.json(),
    transports: 
    [
    new winston.transports.File({
        filename: 'src/logs/error.log',
        level: 'error',
        format : winston.format.combine(
            winston.format.label(),
            winston.format.errors(),
            winston.format.json()
        )
    }),
    new winston.transports.File({
        filename: 'src/logs/http.log',
        level: 'http',
        format: winston.format.combine(
            winston.format.ms(),
            winston.format.json(),
        ),
        maxsize : 2048,
        maxFiles : 5
    })
    ]
})

if(process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format : winston.format.combine(
                winston.format.ms(),
                winston.format.prettyPrint({
                        colorize : true,
                        depth : 5
                    })
            ),
        })
    );
}

export default logger;