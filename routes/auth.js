const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/reg', authController.postReg)
router.post('/log', authController.postLog)
router.post('/val', authController.postVerify)



module.exports = router;