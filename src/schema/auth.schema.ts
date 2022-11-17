import { object, string, TypeOf } from 'zod'


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: john.dan@gmail.com
 *          format: email
 *        password:
 *          type: string
 *          default: stringPassword123
 *          format: password
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 *    CreateRefreshSessionResponse:
 *      type: object
 *      properties:
 *        refreshToken:
 *          type: string    
 */




export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Invalid email or password'),
        password: string().min(6, 'Invalid email or password'),

    })
})


export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body']