const express = require('express')
const {createCategory, deleteCategory, updateCategory, getCategoriesNames} = require('../controllers/category.js');
const router = express.Router();

router.post('/CreateCategory',createCategory); //? Create Category
router.delete('/DeleteCategory',deleteCategory); //? Delete Category
router.put('/UpdateCategory',updateCategory); //? Update Category
router.get('/GetCategoriesNames',getCategoriesNames); //? Get Categories Names in array 


module.exports = router