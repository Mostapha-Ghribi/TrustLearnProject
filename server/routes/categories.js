const express = require('express')
const {createCategory} = require('../controllers/category.js');
const router = express.Router();

router.post('/CreateCategory',createCategory)


module.exports = router