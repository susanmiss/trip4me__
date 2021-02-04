const express = require('express')
const router = express.Router()
const { requireSignin } = require('../controllers/auth')

const { create } = require("../controllers/category");


router.post('/category/create', requireSignin, create);



module.exports = router;
