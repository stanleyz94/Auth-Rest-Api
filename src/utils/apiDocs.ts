import { Express, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import log from './logger'

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "Rest API docs",
          version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        // security: [
        //   {
        //     bearerAuth: [],
        //   },
        // ],
      },
    apis: ['./src/routes/*.ts', './src/schema/*.ts'],
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number | string) {

    //Swager page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    log.info(`API documentation available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs