import { Express, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import log from './logger'

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rest API docs',
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: ['./src/routes/index.ts', './src/routes/auth.route.ts', './src/routes/user.route.ts', './src/schema/*.ts'],
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number | string) {

    //Swager page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    log.info(`Docs available at http://localhost:${port}`)
}

export default swaggerDocs