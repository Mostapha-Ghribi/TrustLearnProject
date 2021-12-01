// Requiring Modules !!
const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
//!----------------------------------------------------------------------

// Create Course
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

//get all courses (return json of names)
const getAllCoursesNames = async (req,res) =>{
    try{
        const Courses = await Course.find();
        res.status(200).json(Courses.name);
    }catch(error){
        res.status(400).json({message : 'Something went wrong ! '});
     }
}

const getAllCourses = async (req,res) =>{
    try{
        const Courses = await Course.find();
        res.status(200).json({result : Courses});
    }catch(error){
        res.status(500).json({message : 'Something went wrong ! '});
     }
}




 const getCourseByTeacher = async (req,res) =>{
    const {teacher} = req.body;
    try{
        const Courses = await Course.find({teacher : teacher});
        if(!Courses) return res.status(400).json({message : `there is no courses created by : ${teacher}`});
        res.status(200).json({result : Courses});
    }catch(error){
        res.status(500).json({message : 'Something went wrong ! '});
     }
}
 const getAllVideoInCourse = async (req,res) => {
const {course_id} = req.params;
try{
    const course = await Course.findOne({course_id});
    if(!course){
        return res.status(400).json({error : "Course Not Found error : "+error})
    }
    const video = await Video.find({'_id' : {$in : course.videos}})
    res.status(200).json({video})

}catch(error){
    return res.status(400).json({error : "something wrong error : "+error})
}
}

 const deleteCourse = async (req,res) => {
    const {course_id} = req.params;
    try{
        const course = await Course.findOne({course_id});
        if(!course){
            return res.status(400).json({
                error : "Course not found error : "+error
            })
        }
        console.log(course.videos);
        const deleteVideos = await Video.deleteMany({_id : {$in : course.videos}});
        const deleteCourse = await Course.findByIdAndDelete(course_id);
        if(!deleteVideos || !deleteCourse){
            return res.status(400).json({
                error : "can't delete videos in course : "+ error
            })
        }
        res.status(200).json({message : "Course deleted successfully !"})

    }catch(error){
        return res.status(400).json({
            error : "something wrong error : "+error
        })
    }
}

 const updateCourse = async (req,res) => {
    const {name,price,description,teacher,category} = req.body;
    const {course_id}= req.params;
    try{
    const course = await Course.find({_id: course_id});
    if(!course){
        return res.status(400).json({error : "Course not found"})
    }
    if(price == ""){
        return res.status(400).json({error : "price required"})
    }
    if(name == ""){
        return res.status(400).json({error : "name required"})
    }
    if(description == ""){
        return res.status(400).json({error : "description required"})
    }
    if(teacher == ""){
        return res.status(400).json({error : "teacher required"})
    }
    if(category == ""){
        return res.status(400).json({error : "category required"})
    }
    const resultCourse = await Course.findOneAndUpdate(
        { _id: course_id },
         { 
            name : name,
            price : price,
            description : description,
            teacher : teacher,
            category : category
          },{returnOriginal: false});

    if(!resultCourse){
        return res.status(404).json({ error : "something wrong in updating Course"})
    }else{
        res.status(200).json({ message: 'Updated ! ' });
    }
}catch(error){
    return res.status(400).json({error : "something wrong error : "+error})
}
};
//!-------------------------------------------------------------------------------------
const getCourseByName = async (req,res) =>{
    try{
    const {name} = req.body;
    const course_1 = await Course.findOne({name : name});
    const course_2 = await Course.findOne({name : name},'_id name description teacher price');
    const AllChaps = course_1.chapters;
    console.log(AllChaps)
    const chapitre_1 = await Chapter.findOne({_id : {$in :AllChaps}},'_id name description');
    const chapitre_2 = await Chapter.findOne({_id : {$in :AllChaps}});
    const AllLessons = chapitre_2.lessons;
    console.log(chapitre_2);
    const lesson_1 = await Lesson.findOne({_id : {$in :AllLessons}},'_id name');
    const lesson_2 = await Lesson.findOne({_id : {$in :AllLessons}}); 
    const AllVideos = lesson_2.videos;
    const video = await Video.findOne({_id : {$in :AllVideos}}); 

    var add_videos = {"videos" : video};
    //console.log(AllVideos)
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

module.exports = {getCourseByName, createCourse , updateCourse , deleteCourse , getAllCourses , getAllVideoInCourse  , getCourseByTeacher}