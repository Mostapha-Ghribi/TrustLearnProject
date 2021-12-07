//* Importing modules
const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
const {getVideosWithLessonAsParam} = require('./video.js')
//!----------------------------------------------------------------------
//* Create Lesson
const createLesson = async (req,res) => {
    const {name,chapter} = req.body; // get data from body
    try{
        if(name==""){
            return res.status(400).json({error : "name is required"})
        }
        const existingName = await Lesson.findOne({name : { $regex: new RegExp("^" + name.toLowerCase(), "i") }});
        if(existingName) return res.status(400).json({error : "Lesson already exists ! "});
        const resultLesson = await Lesson.create(
            {   
                _id : name,
                name
            }
        )
        const getChapter = await Chapter.findOne({name : chapter});

        const resultAddToChapter = await Chapter.findByIdAndUpdate(
            getChapter._id,
            {$push: {lessons: name}}
            );
            if(!resultLesson || !resultAddToChapter)
            {
                return res.status(400).json(
                    {
                        error : "something wrong in creating Lesson error : "+error
                    })
            }
            else{
                res.json(
                    {
                        message : "Lesson created successfully"
                    })
                }
    }catch(error)
    {
        res.status(400).json({error : "something wrong "+error})
    }
};
//!----------------------------------------------------------------------------------------
// TODO: Delete Lesson
const deleteLesson = async (req,res)=>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------
// TODO: Update Lesson
const updateLesson = async (req,res)=>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------
// TODO: Get Lessons Into Array By Chapter
const getLessonsByChaptrIntoArray = async (req,res)=>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------
const getLessonsWithChapterParam = async (name)=>{
        const chapter = await Chapter.findOne({name : name});
        const lessons = chapter.lessons;
        var result = [];
    for await (const lesson of lessons) {
        const L = await Lesson.findOne({name : lesson},'_id name');
        const Videos = await getVideosWithLessonAsParam(lesson);
        var add_videos = {"videos" : Videos};
        var lesson_final = Object.assign(L,add_videos);
        result.push(lesson_final)
      }
    return result;
}
//*Export Modules

module.exports = {createLesson, deleteLesson, updateLesson, getLessonsByChaptrIntoArray, getLessonsWithChapterParam};