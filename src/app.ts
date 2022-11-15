require('dotenv').config()
import log from './utils/logger'
import connectToDb from './utils/connectToDb'
import createServer from './utils/createServer'

const port = process.env.PORT
const app = createServer()

app.listen(port, () => {
    log.info('App started')
    connectToDb()
})