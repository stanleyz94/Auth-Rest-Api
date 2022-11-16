import supertest from 'supertest'
import createServer from '../utils/createServer'
import * as UserService from '../service/user.service'
import userStub from './stubs/user.stub'

const app = createServer()

describe('user', () => {

    describe('user register - POST /api/users', () => {
        
        describe('given the username and password are valid', () => {
            it('should return the response text "User succcessfully created"', async () => {
               const createUserServiceMock = jest
               .spyOn(UserService, 'createUser')
               // @ts-ignore
               .mockReturnValue(userStub().userPayload)
                // @ts-ignore
                const { statusCode, text } = await supertest(app)
                .post('/api/users')
                .send(userStub().userInput)
                
                expect(statusCode).toBe(200)
                expect(text).toEqual('User succcessfully created')
                expect(createUserServiceMock).toHaveBeenCalledWith(userStub().userInput)
            })

        })

        describe('given confirm password is invalid', () => {
            it('should return a 400', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValue(userStub().userPayload)
                
                 const { statusCode } = await supertest(app)
                 .post('/api/users')
                 .send({ ...userStub().userInput, passwordConfirmation: 'doesntmatch' })
                 
                 expect(statusCode).toBe(400)
                 expect(createUserServiceMock).not.toHaveBeenCalledWith(userStub().userInput)
            })
        })
        
    })

})
