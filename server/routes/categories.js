const express = require('express')
const {createCategory, deleteCategory, getCategory, getCategories, updateCategory, getCategoriesNames} = require('../controllers/category.js');
const router = express.Router();

router.post('/CreateCategory',createCategory); //? Create Category
router.delete('/DeleteCategory/:id',deleteCategory); //? Delete Category
router.put('/UpdateCategory',updateCategory); //? Update Category
router.get('/GetCategoriesNames',getCategoriesNames); //? Get Categories Names in array 
router.get('/GetCategory/:id',getCategory); //? Get Category by id
router.get('/GetCategories',getCategories);


module.exports = router