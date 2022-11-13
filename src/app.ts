// require('dotenv').config()
import express from 'express'
import router from './routes'
import log from './utils/logger'
import connectToDb from './utils/connectToDb'
import deserializeUser from './middleware/deserializeUser'


const app = express()
app.use(express.json())
app.use(deserializeUser)
const port = process.env.PORT
app.use(router)
app.listen(port, () => {
    log.info('App started')
    // connectToDb()
})