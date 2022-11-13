import { object, string, TypeOf } from 'zod'

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Invalid email or password'),
        password: string().min(6, 'Invalid email or password'),

    })
})


export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body']