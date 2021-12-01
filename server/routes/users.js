const express = require('express');

const { signin, signup, verifyEmail, forgetPassword, resetPassword, getAllStudents, getAllTeachers} = require('../controllers/user.js');
const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);
router.get('/verify-email' , verifyEmail);
router.put('/forget-password' , forgetPassword);
router.put('/reset-password' , resetPassword);
router.get('/getAllUsers',getAllStudents);
router.get('/getAllTeachers',getAllTeachers);

module.exports = router;