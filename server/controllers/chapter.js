const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
//!----------------------------------------------------------------------

//* Create Chapter
const createChapter = async (req,res) => {
    const {name,description,course} = req.body; // get data from body
    try{
        const existingName = await Chapter.findOne({name : { $regex: new RegExp("^" + name.toLowerCase(), "i") }});
        if(existingName) return res.status(400).json({error : "Chapter already exists ! "});
        if(name==""){
            return res.status(400).json({error : "name is required"})
        }
        if(description==""){
            return res.status(400).json({error : "description is required"})
        }
       // var number = await Chapter.estimatedDocumentCount();
        const resultChapter = await Chapter.create(
            {   
                _id : name,
                name,
                description
            }
        )
        //const getCategory = await Category.findOne({name : category});
        const getCourse = await Course.findOne({name : course});

        const resultAddToCourse = await Course.findByIdAndUpdate(
            getCourse._id,
            {$push: {chapters: name}}
            );
            if(!resultChapter || !resultAddToCourse)
            {
                return res.status(400).json(
                    {
                        error : "something wrong in creating Chapter error : "+error
                    })
            }
            else{
                res.json(
                    {
                        message : "Chapter created successfully"
                    })
                }
    }catch(error)
    {
        res.status(400).json({error : "something wrong "+error})
    }
};
//!----------------------------------------------------------------------------------------
// TODO : Delete Chapter
const deleteChapter = async (req,res) =>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------
// TODO : Update Chapter
const updateChapter = async (req,res) =>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------
// TODO : Get Chapters from Course and send it as array
const getChaptersByCourseIntroArray = async (req,res) =>{
    try{

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//Export Modules

module.exports = {createChapter, deleteChapter, updateChapter, getChaptersByCourseIntroArray};