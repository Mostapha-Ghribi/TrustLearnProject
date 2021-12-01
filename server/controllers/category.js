// Requiring Modules !!
const {Course, Chapter, Lesson, Video, Category} = require('../models/model.js')
//!----------------------------------------------------------------------

// Create Category
const createCategory = async (req,res) => {
    const {name} = req.body; // get data from body
    try{
        const existingName = await Category.findOne({name : { $regex: new RegExp("^" + name.toLowerCase(), "i") }});
        if(existingName) return res.status(400).json({error : "Category already exists ! "});
    const resultCategory = await Category.create({
        name, 
    }) // create Category with data from body
    if(!resultCategory){ 
        // if there is a problem in creating a Category return 400 statusCode
        return res.status(400).json({ error : "something wrong in creating Category error : "+error})
    }else{
        // Category Created Successfully !!
        res.json({message : "Category created successfully"})
    }
}catch(error){
    res.status(400).json({error : "something wrong error : "+error})
}
}; 
//!----------------------------------------------------------------------------------------------------

//Exporting module
module.exports = {createCategory}