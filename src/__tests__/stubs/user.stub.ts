import mongoose from "mongoose"
import { CreateUserInput } from "../../schema/user.schema"


const userId = new mongoose.Types.ObjectId().toString()

export default function userStub() {
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
    return {
        userPayload,
        userInput
    }
}

