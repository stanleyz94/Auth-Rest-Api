import mongoose from "mongoose"
import log from "./logger"


export default async function connectToDb() {
    const dbUri = process.env.DB_URI as string
    try {
        await mongoose.connect(dbUri)
        log.info('Conntected to db')
    } catch(e) {
        log.error(`${e} Error connection with db`)
        process.exit(1)
    }
}