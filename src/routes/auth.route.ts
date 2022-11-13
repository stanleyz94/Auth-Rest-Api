import express from 'express'
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/auth.controller'
import validateResource from '../middleware/validateResource:'
import { createSessionSchema } from '../schema/auth.schema'

const router = express.Router()


router.post('/api/auth', (req, res) => {
    res.sendStatus(200)
})

router.post('api/session', validateResource(createSessionSchema), createSessionHandler)

router.post('/api/session/refresh', refreshAccessTokenHandler)

export default router