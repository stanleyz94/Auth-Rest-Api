import winston from 'winston'
const { combine, timestamp, align, printf, colorize, json } = winston.format 

const log = winston.createLogger({
    level: process.env.LOG_LEVEL || 'http',
    format: combine( 
        colorize({ all: true }),
        timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        json(),
        align(),
        printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`)
    ),
    transports: [new winston.transports.Console()],

})



export default log
