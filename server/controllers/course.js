//* Requiring Modules !!
const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
const {getChaptersWithCourseParam} = require('./chapter.js')
//!----------------------------------------------------------------------
//* Create Course
const createCourse = async (req,res) => {
    const {name,price,description,teacher,category} = req.body; // get data from body
    const existingName = await Course.findOne({name : { $regex: new RegExp("^" + name.toLowerCase(), "i") }});
        if(existingName) return res.status(400).json({error : "Course already exists ! "});
    const getCategory = await Category.findOne({name : category});
    const resultCourse = await Course.create({
        _id : name,
        name,
        price,
        description,
        teacher
    }) // create course with data from body
    const resultAddToCategory = await Category.findByIdAndUpdate(
        getCategory._id,
        {$push: {courses: name}}
        );
    if(!resultCourse || !resultAddToCategory){ 
        // if there is a problem in creating a course return 400 statusCode
        return res.status(400).json({ error : "something wrong in creating course error : "+error})
    }else{
        // Course Created Successfully !!
        res.json({message : "course created successfully"})
    }
}; 
//!----------------------------------------------------------------------------------------------------
//* Delete Course 
const deleteCourse = async (req,res) => {
    try{
        const {name} = req.body;
        const course = await Course.findOne({name : name});
        const chapters = await course.chapters;
        for await (const chapter of chapters) {
            const chapterClass = await Chapter.findOne({name : chapter});
            const lessons = await chapterClass.lessons;
                for await (const lesson of lessons) {
                    const lessonClass = await Lesson.findOne({name : lesson});
                    const videos = await lessonClass.videos;
                        await Video.deleteMany({_id : {$in : videos}})
                }
            await Lesson.deleteMany({_id : {$in : lessons}})
          }
          await Chapter.deleteMany({_id : {$in : chapters}})
          await Course.deleteOne({name : name})
          return res.status(200).json({message : "course deleted succesfully"})

    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------------------
//* Delete Course By Name (With Name as param)
const deleteCourseByNameAsParam = async (name) => {
        const course = await Course.findOne({name : name});
        const chapters = await course.chapters;
        for await (const chapter of chapters) {
            const chapterClass = await Chapter.findOne({name : chapter});
            const lessons = await chapterClass.lessons;
                for await (const lesson of lessons) {
                    const lessonClass = await Lesson.findOne({name : lesson});
                    const videos = await lessonClass.videos;
                        await Video.deleteMany({_id : {$in : videos}})
                }
            await Lesson.deleteMany({_id : {$in : lessons}})
          }
          await Chapter.deleteMany({_id : {$in : chapters}})
          await Course.deleteOne({name : name})

}
//!----------------------------------------------------------------------------------------------------
//TODO: Update Course
const updateCourse = async (req,res) => {
    try{

    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}
//!-------------------------------------------------------------------------------------
//* Get Courses names By Category
const getCoursesByCategoryIntoArray = async (req,res)=>{
    const {name} = req.body;
    try{
        const category = await Category.findOne({name : name});
        const courses = await category.courses;
        return res.status(200).json(courses);

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!-------------------------------------------------------------------------------------

//* Get Course By Name (_id == name)
const getCourseOld = async (req,res) => {
    try{
        const {name} = req.params;
        const course_1 = await Course.findOne({name : name});
        const course_2 = await Course.findOne({name : name},'_id name description teacher price image');
        const AllChaps = course_1.chapters;
        console.log(AllChaps);
        const chapitre_1 = await Chapter.findOne({_id : {$in :AllChaps}},'_id name description');
        const chapitre_2 = await Chapter.findOne({_id : {$in :AllChaps}});
        const AllLessons = chapitre_2.lessons;
        const lesson_1 = await Lesson.findOne({_id : {$in :AllLessons}},'_id name');
        const lesson_2 = await Lesson.findOne({_id : {$in :AllLessons}}); 
        const AllVideos = lesson_2.videos;
        const video = await Video.findOne({_id : {$in :AllVideos}}); 
    
        var add_videos = {"videos" : video};
        var lessons_final = Object.assign(lesson_1,add_videos);
        var add_lessons = {"lessons" : lessons_final};
        var chapters_final = Object.assign(chapitre_1,add_lessons);
        var add_chapters = {"chapters" : chapters_final};
        var course_final = Object.assign(course_2,add_chapters);
    
    
        res.status(200).json(course_final);
        }catch(error){
            res.status(400).json({error : "nope error : "+error})
        }

}
//!-------------------------------------------------------------------------------------

//* Get Course By Name (_id == name)
const getCourse = async (req,res) => {
    try{
        const {name} = req.params;
        const course = await Course.findOne({name : name},'_id name description teacher price image');
        //console.log(course)
        const chapters = await getChaptersWithCourseParam(name);
        console.log(chapters);
        var add_chapters = {"chapters" : chapters};
        var course_final = Object.assign(course,add_chapters);
    
    
        res.status(200).json(course_final);
        }catch(error){
            res.status(400).json({error : "nope error : "+error})
        }

}
//!-------------------------------------------------------------------------------------
//* Get All Courses (Without Category)
const getAllCourses = async (req,res) => {
    try{
        const courses = await Course.find({},{name:1,_id:0});
        var coursesNames = [];
        var result = [];
        for await (const course of courses){
            coursesNames.push(course.name);
        }
        for await (const CN of coursesNames) {
            const C = await getCourseByNamewithParam(CN)
            result.push(C)
          }

        return res.status(200).json(result);


    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}
//!-------------------------------------------------------------------------------------
//* Get All Courses (With Category)
const getAllCoursesByCategory = async (req,res) =>{
    const {name} = req.params;
    try{
        const category = await Category.findOne({name : name});
        if(!category) return res.status(200).json({message : "idk"})
        const courses = await category.courses;
        var tab = [];

        for await (const course of courses) {
            const C = await getCourseByNamewithParam(course)
            tab.push(C)
          }
        return res.status(200).json(tab)
    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }

}
//!-------------------------------------------------------------------------------------
//TODO: Get All Courses By Teacher
const getAllCoursesByTeacher = async (req,res) => {
    try{

    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}
//!-------------------------------------------------------------------------------------
//* Get Course By Name (_id == name) with name as a param
const getCourseByNamewithParam = async (name) =>{
    const course_1 = await Course.findOne({name : name});
    const course_2 = await Course.findOne({name : name},'_id name description teacher price image');
    const AllChaps = course_1.chapters;
    const chapitre_1 = await Chapter.findOne({_id : {$in :AllChaps}},'_id name description');
    const chapitre_2 = await Chapter.findOne({_id : {$in :AllChaps}});
    const AllLessons = chapitre_2.lessons;
    const lesson_1 = await Lesson.findOne({_id : {$in :AllLessons}},'_id name');
    const lesson_2 = await Lesson.findOne({_id : {$in :AllLessons}}); 
    const AllVideos = lesson_2.videos;
    const video = await Video.findOne({_id : {$in :AllVideos}}); 

    var add_videos = {"videos" : video};
    var lessons_final = Object.assign(lesson_1,add_videos);
    var add_lessons = {"lessons" : lessons_final};
    var chapters_final = Object.assign(chapitre_1,add_lessons);
    var add_chapters = {"chapters" : chapters_final};
    var course_final = Object.assign(course_2,add_chapters);

    return course_final ;
    
        
}
//!----------------------------------------------------------------------------------------

module.exports = {getCourseByNamewithParam, createCourse, deleteCourse, updateCourse, getCourse, getAllCourses, getAllCoursesByCategory, getAllCoursesByTeacher, getCoursesByCategoryIntoArray}