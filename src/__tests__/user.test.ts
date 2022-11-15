import supertest from 'supertest'
import createServer from '../utils/createServer'
import { CreateUserInput } from '../schema/user.schema'
import { User } from '../model/user.model'
import * as UserService from '../service/user.service'
import * as AuthService from '../service/auth.service'
import mongoose from 'mongoose'
import { createSessionHandler } from '../controller/auth.controller'
const app = createServer()
const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
    _id: userId,
    email: 'test@gmail.com',
    firstName: 'Dan',
    lastName: 'Light',
}

const userInput: CreateUserInput = {
    email: 'test@gmail.com',
    password: 'qwerty1234',
    passwordConfirmation: 'qwerty1234',
    firstName: 'Dan',
    lastName: 'Light',
    
}


const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
}


describe('user', () => {
    describe('user register', () => {
        
        describe('given the username and password are valid', () => {
            it('should return the user payload', async () => {
               const createUserServiceMock = jest
               .spyOn(UserService, 'createUser')
               // @ts-ignore
               .mockReturnValue(userPayload)
                console.log('userModel', User)
                const { statusCode } = await supertest(app).post('/api/users').send(userInput)
                expect(statusCode).toBe(200)
                console.log(createUserServiceMock)
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })

        })

        describe('given confirm password is invalid', () => {
            it('should return a 400', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValue(userPayload)
                
                 const { statusCode } = await supertest(app)
                 .post('/api/users')
                 .send({ ...userInput, passwordConfirmation: 'doesntmatch' })
                 expect(statusCode).toBe(400)
                 expect(createUserServiceMock).not.toHaveBeenCalledWith()
            })
        })

        // describe('given the user service throws', () => {
        //     it('should handle the error', async () => {
               
        //     })
        // })
    })

    // describe('create user session', () => {
    //     describe('given the username and password are valid', () => {
    //         it('should return a signed accessToken and refreshToken', async () => {
    //            jest.spyOn(UserModel, 'validatePassword')
    //            UserModel
    //            // @ts-ignore
    //            .mockReturnValue(userPayload)
    //            jest.spyOn(AuthService, 'createSession')
    //            // @ts-ignore
    //            .mockReturnValue(sessionPayload)
                
    //            const req = {
    //             get: () => {
    //                 'a user agent'
    //             },
    //             body: {
    //                 email: 'test@gmail.com',
    //                 password: 'qwerty1234',
    //             }
    //            }
    //            const send = jest.fn()
    //            const res = {
    //                 send
    //            }
    //            // @ts-ignore
    //            await createSessionHandler(req, res)
    //            expect(send).toHaveBeenCalledWith({
    //                 accessToken: expect.any(String),
    //                 refreshToken: expect.any(String)
    //            })
    //         })
    //     })
    //     })
})
