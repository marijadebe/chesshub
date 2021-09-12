const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/reg', authController.postReg)
router.post('/log', authController.postLog)



module.exports = router;