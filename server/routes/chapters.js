const express = require('express')
const {createChapter} = require('../controllers/chapter.js');

const router = express.Router();

//router.post('/Courses' , getAllCourses);
//router.get('/:course_id',getCourseById);
router.post('/CreateChapter/',createChapter);
//router.get('/Videos/:course_id',getAllVideoInCourse);
//router.delete('/DeleteCourse/:course_id',deleteCourse);
//router.put('/UpdateCourse/:course_id',updateCourse);
module.exports = router;
