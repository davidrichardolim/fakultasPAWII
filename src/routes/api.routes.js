import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import FakultasController from '../controllers/fakultas.controller.js'
import logMiddleware from '../middleware/log.middleware.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

router.use(logMiddleware)

router.get('/fakultas', FakultasController.index)
router.get('/fakultas/:id', FakultasController.show)
router.post('/fakultas',FakultasController.store)
router.put('/fakultas/:id', FakultasController.update)
router.patch('/fakultas/:id', FakultasController.update)
router.delete('/fakultas/:id', FakultasController.delete)


export default router
