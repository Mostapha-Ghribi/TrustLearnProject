//* Requiring Modules !!
const {Category} = require('../models/model.js')
const {deleteCourseByNameAsParam} = require('./course.js')
//!----------------------------------------------------------------------
//* Create Category
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
//* Delete Category
const deleteCategory = async (req,res)=>{
    const {id} = req.params;
    try{
        const category = await Category.findOne({_id : id});
        const courses = await category.courses;
        for await(const course of courses){
            deleteCourseByNameAsParam(course);
        }
        await Category.deleteOne({_id : id})
        return res.status(200).json({message : "Category Deleted Successfully !"})

    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------------------
//* Update Category
const updateCategory = async (req,res)=>{
    const {name , id} = req.body;

    try{
    const existingCategory = await Category.findOne({name : name});
    if(existingCategory) return res.status(400).json({message : "Category name exist choose another name"});
    const resultUpdate = await Category.findOneAndUpdate(
        { _id: id },
         { name : name
          },{returnOriginal: false});
        if(!resultUpdate) return res.status(400).json({error : "can't update something wrong"})
        return res.status(200).json({message : "Category Updated Succesfully !"})


    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------------------
//* Get Categories Names and send it in array
const getCategoriesNames = async (req,res)=>{
    try{

        const categories = await Category.find({},{name:1,_id:0});
        var categoriesNames = [];
        for await (const category of categories){
            categoriesNames.push(category.name);
        }


        return res.status(200).json(categoriesNames);
    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------------------
//* Get Category By ID
const getCategory = async (req,res)=>{
    const {id} = req.params
    try{

        const category = await Category.findOne({_id : id});
        return res.status(200).json(category)


    }catch(error){
        return res.status(400).json({error : "something went wrong error : "+error})
    }
}
//!----------------------------------------------------------------------------------------------------------------
//* Get Categories
const getCategories = async (req,res)=> {
    try{
        const categories = await Category.find({},'_id name');
        return res.status(200).json(categories)

    }catch(error){
        return res.status(400).json({error : "something wrong happend error : " +error})
    }
}
//* Exporting module
module.exports = {createCategory, deleteCategory, updateCategory, getCategories, getCategory, getCategoriesNames}