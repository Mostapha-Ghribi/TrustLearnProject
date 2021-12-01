// Requiring modules
const mongoose = require('mongoose')
//!-----------------------------------------------

// Category Modal Schema
const categorySchema = new mongoose.Schema({
    name : {type : String, required : true},
    courses : {type : []}  
});
//!-----------------------------------------------

// Course Modal Schema
const courseSchema = new mongoose.Schema({
    _id : {type : String},
    name : {type : String, required : true},
    price : {type : Number, required : true},
    description : {type : String, required : true},
    teacher : {type : String,required : true},
    chapters : {type : []}  
});
//!------------------------------------------------

// Chapter Modal Schema
const chapterSchema = new mongoose.Schema({
    _id : {type : String},
    name : {type : String, required : true},
    description : {type : String, required : true},
    lessons : {type : []}
});
//!------------------------------------------------

// Lesson Modal Schema
const lessonSchema = new mongoose.Schema({
    _id : {type : String},
    name : {type : String, required : true},
    videos : {type : []}
});
//!------------------------------------------------

// Videos Modal Schema
const videoSchema = new mongoose.Schema({
    _id : {type : String},
    name : {type : String, required : true},
    url : {type : String , required : true},
});
//!------------------------------------------------

// Student Modal Schema
const studentSchema = mongoose.Schema({
    name : {type : String, required : true},
    email:{type : String, required : true},
    emailToken : String,
    password:{type : String, required : true},
    isVerified : Boolean,
    phone:{type : String, required : true},
    enrolledCourses_id : [],
    resetLink:{data : String,default:''}
},{timestamps:true})
//!------------------------------------------------
  
// Teacher Modal Schema
const teacherSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email:{type : String, required : true},
    emailToken : String,
    password:{type : String, required : true},
    isVerified : Boolean,
    phone:{type : String, required : true},
    CoursesCreated_id : [],
    resetLink:{data : String,default:''}
},{timestamps:true})
//!------------------------------------------------
  
// Creating model objects
const Category = mongoose.model('category', categorySchema,"Categories");
const Course = mongoose.model('course', courseSchema,"Courses");
const Chapter = mongoose.model('chapter', chapterSchema,"Chapters");
const Lesson = mongoose.model('lesson', lessonSchema,"Lessons");
const Video = mongoose.model('video', videoSchema,"Videos");
const Student = mongoose.model('student', studentSchema,"Students");
const Teacher = mongoose.model('teacher', teacherSchema,"Teachers");

//!------------------------------------------------
  
// Exporting our model objects
module.exports = {Course , Student , Teacher, Video, Chapter, Lesson, Category}