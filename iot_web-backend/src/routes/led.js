const express = require('express')
const router = express.Router()

const LedController = require('../app/controllers/LedController')

router.put('/:id',LedController.turn_on)
router.post('/:id',LedController.turn_off)
router.get('/status',LedController.list_status)
router.get('/',LedController.list)
module.exports = router