const express = require('express')
const router = express.Router()

const sensorController = require('../app/controllers/SensorController')

router.post('/end',sensorController.shutdown)
router.get('/live',sensorController.getonce)
router.get('/getday',sensorController.getday)
router.get('/',sensorController.getall)

module.exports = router