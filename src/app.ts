require('dotenv').config()
import log from './utils/logger'
import connectToDb from './utils/connectToDb'
import createServer from './utils/createServer'
import swaggerDocs from './utils/apiDocs'


const port = process.env.PORT || 1234
const app = createServer()

app.listen(port, () => {
    log.info('App started')
    connectToDb()
    swaggerDocs(app, port)
})