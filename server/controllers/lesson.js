const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
//!----------------------------------------------------------------------

// Create Lesson
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

//Export Modules

module.exports = {createLesson};