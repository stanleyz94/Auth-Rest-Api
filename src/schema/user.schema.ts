import { object, string, TypeOf } from 'zod'


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - firstName
 *        - lastName
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: john.dan@gmail.com
 *          format: email
 *        firstName:
 *          type: string
 *          default: John
 *        lastName:
 *          type: string
 *          default: Dan
 *        password:
 *          type: string
 *          default: stringPassword123
 *          format: password
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *          format: password
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *          format: uuid
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    VerifyUserInput:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        verificationCode:
 *          type: string
 *    ForgotPasswordInput:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *    ResetPasswordInput:
 *      type: object
 *      properties:
 *        password:
 *          type: string
 *          format: passsword
 *        passwordConfirmation:
 *          type: string
 *          format: password
 *    GetCurrentUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *          format: uuid
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        iat:
 *          type: number
 *        exp:
 *          type: number        
 */

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required'
        }),
        lastName: string({
            required_error: 'Last name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short - should be min 6 chars'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email')    
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Password do not match',
        path: ['passwordConfirmation']
    })
})

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
})


export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email')
    })
})

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short - should be min 6 chars'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Password do not match',
        path: ['passwordConfirmation']
    })
})


export type CreateUserInput = TypeOf<typeof createUserSchema>['body']

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params']

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body']

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>