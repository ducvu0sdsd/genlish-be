'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../../controllers/middleware')
const userController = require('../../controllers/user.controller')

router.post('/update', middleware.checkToken, userController.update)

module.exports = router  