const express = require('express')
const { signin, signup, signout} = require('../controllers/auth')
const { sendEmail} = require('../controllers/sendEmail')
const {hasAuthorization} = require('../controllers/user')


const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/signout', signout)
router.post('/sendemail', sendEmail)


module.exports = router;
