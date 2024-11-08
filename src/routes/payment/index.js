'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../../controllers/middleware')
const paymentController = require('../../controllers/payment.controller')

router.post('/insert', middleware.checkToken, paymentController.insert)
router.post('/get-by-time-and-provider', middleware.checkToken, paymentController.getByProviderAndTime)
router.get('/get-balance/:provider_id', middleware.checkToken, paymentController.getBalance)
router.post('/create_payment_url', paymentController.payment)
router.post('/check_payment', middleware.checkToken, paymentController.checkPayment)
router.post('/update', middleware.checkToken, paymentController.update)
router.get('/get-by-customer/:id', middleware.checkToken, paymentController.getByCustomer)

module.exports = router  