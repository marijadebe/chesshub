const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController')

router.get('/', appController.getApp)
router.get('/pass', appController.getPass)
router.get('/signup', appController.getSignup)
router.get('/main', appController.getMain)

module.exports = router;