import express from 'express'
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller'
import requireUser from '../middleware/requireUser'
import validateResource from '../middleware/validateResource:'
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema'

const router = express.Router()

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   *      500:
   *        description: Something went wrong
   */
router.post('/api/users', validateResource(createUserSchema), createUserHandler)


  /**
   * @openapi
   * '/api/users/verify/{id}/{verificationCode}':
   *  post:
   *     tags:
   *     - User
   *     summary: Verify account
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the product
   *        required: true
   *      - name: verificationCode
   *        in: path
   *        description: The verificationCode of the product
   *        required: true
   *        schema:
   *          $ref: '#/components/schemas/VerifyUserInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/VerifyUserInput'
   *       404:
   *         description: Product not found
   *       400:
   *         description: Bad request
   */


router.post('/api/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler)

router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler)

router.post('/api/users/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler)

router.get('/api/users/me', requireUser ,getCurrentUserHandler)


export default router