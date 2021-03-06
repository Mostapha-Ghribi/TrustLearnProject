//* Importing modules
const {Lesson, Video} = require('../models/model.js')
//!--------------------------------------------------------------------------------------------------------
//* Create Video
 const createVideo = async (req,res) => {
    const {name,url,lesson} = req.body;
    try{
        const existingName = await Video.findOne({name : { $regex: new RegExp("^" + name.toLowerCase(), "i") }});
        if(existingName) return res.status(400).json({error : "Video already exists ! "});
        if(name==""){
            return res.status(400).json({error : "name is required"})
        }
        if(url==""){
            return res.status(400).json({error : "url is required"})
        }
        const resultVideo = await Video.create(
            {   
                _id : name,
                name,
                url
            }
        )
        const getLesson = await Lesson.findOne({name : lesson});

        const resultAddToLesson = await Lesson.findByIdAndUpdate(
            getLesson._id,
            {$push: {videos: name}}
            );
        if(!resultVideo || !resultAddToLesson){return res.status(400).json({ error : "something wrong in creating video"})
        }else{res.json({message : "video created successfully"})}
}catch(error){res.status(400).json({error : "something wrong "+error})}};
//!--------------------------------------------------------------------------------------------------------
// TODO: Delete Video
const deleteVideo = async (req,res) => {
    const {name} = req.body;
    try{
    const video = await Video.findOne({name: name});
    if(!video){
        return res.status(400).json({error : "Video not found"})
    }
    const resultVideo = await Video.deleteOne({_id : video_id})
    const resultLesson = await Lesson.find(
        { videos: { $elemMatch: name } },
         { $pull: { videos: name } }, { new: true });

    if(!resultVideo || !resultLesson){
        return res.status(400).json({ error : "something wrong in deleting video"})
    }else{
        res.status(200).json({ request: 'Deleted', Video, Course });
    }
}catch(error){
    return res.status(400).json({error : "something wrong error : "+error})
}
} 
//!--------------------------------------------------------------------------------------------------------
// TODO: Update Video
const updateVideo = async (req,res) => {
    try{

    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
} 
//!--------------------------------------------------------------------------------------------------------

 const UpdateVideo = async (req,res) => {
    const {name,url} = req.body;
    const {video_id}= req.params;
    try{
    const video = await Video.find({_id: video_id});
    if(!video){
        return res.status(400).json({error : "Video not found"})
    }
    const resultVideo = await Video.findOneAndUpdate(
        { _id: video_id },
         { name : name,
            url : url
             
          },{returnOriginal: false});

    if(!resultVideo){
        return res.status(404).json({ error : "something wrong in updating video"})
    }else{
        res.status(200).json({ request: 'Updated ! ', Video });
    }
}catch(error){
    return res.status(400).json({error : "something wrong error : "+error})
}
};
//!--------------------------------------------------------------------------------------------------------

const getVideosWithLessonAsParam = async (name) => {
    const lesson = await Lesson.findOne({name : name});
    const Videos = lesson.videos;
    var result = [];
    for await (const video of Videos) {
        const V = await Video.findOne({_id : video});
        result.push(V)
      }
    return result;
};

module.exports = {createVideo , deleteVideo , updateVideo , getVideosWithLessonAsParam}