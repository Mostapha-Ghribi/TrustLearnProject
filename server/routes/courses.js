const express = require('express')
const {getFullCourse, getAllCourses , createCourse, getCourseById, getAllVideoInCourse, deleteCourse, updateCourse} = require('../controllers/course.js');

const router = express.Router();

router.post('/Courses' , getAllCourses);
router.post('/getCourse',getFullCourse);
router.get('/:course_id',getCourseById);
router.post('/CreateCourse',createCourse);
router.get('/Videos/:course_id',getAllVideoInCourse);
router.delete('/DeleteCourse/:course_id',deleteCourse);
router.put('/UpdateCourse/:course_id',updateCourse);
module.exports = router;
