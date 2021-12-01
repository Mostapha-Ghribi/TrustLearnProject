const express = require('express')
const { getAllCourses , createCourse, getCourseByName, getAllVideoInCourse, deleteCourse, updateCourse} = require('../controllers/course.js');

const router = express.Router();

router.post('/Courses' , getAllCourses);
router.get('/getCourse',getCourseByName);
router.post('/CreateCourse',createCourse);
router.get('/Videos/:course_id',getAllVideoInCourse);
router.delete('/DeleteCourse/:course_id',deleteCourse);
router.put('/UpdateCourse/:course_id',updateCourse);
module.exports = router;
