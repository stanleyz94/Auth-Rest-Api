import mongoose from "mongoose"


export default async function connectToDb() {
    const dbUri = process.env.DB_URI as string
    try {
        await mongoose.connect(dbUri)
    } catch(e) {
        console.log(e)
        process.exit(1)
    }
}