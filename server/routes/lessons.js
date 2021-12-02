const express = require('express')
const {createLesson, deleteLesson, updateLesson} = require('../controllers/lesson.js');

const router = express.Router();

router.post('/CreateLesson',createLesson); //? Create Lesson
router.delete('/DeleteLesson',deleteLesson); //? Delete Lesson
router.put('/UpdateLesson',updateLesson); //? Update Lesson

module.exports = router
