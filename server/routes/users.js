const express = require('express');

const {getCoursesFromStudent, signin, signup, verifyEmail, enrollInCourse, forgetPassword, getUser, resetPassword,getStudentByEmail, getAllStudents, getAllTeachers} = require('../controllers/user.js');
const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);
router.get('/verify-email' , verifyEmail);
router.put('/forget-password' , forgetPassword);
router.put('/reset-password/:resetLink/:role' , resetPassword);
router.get('/getAllStudents',getAllStudents);
router.get('/getUser/:email/:role',getUser);
router.get('/getAllTeachers',getAllTeachers);
router.get('/getStudentByEmail',getStudentByEmail);
router.put('/enrollInCourse',enrollInCourse);
router.get('/enrolledCourses',getCoursesFromStudent);

module.exports = router;