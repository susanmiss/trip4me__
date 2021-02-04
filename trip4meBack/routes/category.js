const express = require('express')
const router = express.Router()
const { requireSignin } = require('../controllers/auth')

const { create, categoryById, singleCategory, update, remove, list } = require("../controllers/category");


router.post('/category/create', requireSignin, create);
router.put('/category/:categoryId', requireSignin, update);
router.delete('/category/:categoryId', requireSignin, remove);
router.get('/category/:categoryId', singleCategory);
router.get('/categories', list);

router.param('categoryId', categoryById);



module.exports = router;
