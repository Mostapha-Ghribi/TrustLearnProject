const express = require('express')
const { createCourse, deleteCourse, updateCourse, getCourse, getAllCourses, getAllCoursesByCategory, getAllCoursesByTeacher, getCoursesByCategoryIntoArray} = require('../controllers/course.js');

const router = express.Router();
router.post('/CreateCourse',createCourse); // ? Create Course
router.delete('/DeleteCourse',deleteCourse); // ? Delete Course
router.put('/UpdateCourse',updateCourse); // ? Update Course
router.get('/GetCourse/:name', getCourse); // ? Get Course By Name (_id == name)
router.get('/GetAllCourses', getAllCourses); // ? Get ALL Courses (Without Category)
router.get('/GetAllCoursesByCategory/:name',getAllCoursesByCategory); //? Get All Courses (With Category)
router.get('/GetAllCoursesByTeacher',getAllCoursesByTeacher); //? Get All Courses By Teacher
router.get('/GetCoursesByCategoryIntoArray',getCoursesByCategoryIntoArray); //? Get Courses By Category Into Array
module.exports = router;
