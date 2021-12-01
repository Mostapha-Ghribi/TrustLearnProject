const express = require('express')
const {createLesson} = require('../controllers/lesson.js');

const router = express.Router();
router.post('/CreateLesson/',createLesson);

module.exports = router
