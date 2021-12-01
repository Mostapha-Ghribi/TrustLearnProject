const express = require('express')
const {createChapter, deleteChapter, updateChapter} = require('../controllers/chapter.js');

const router = express.Router();


router.post('/CreateChapter',createChapter); //? Create Chapter
router.delete('/DeleteChapter',deleteChapter); //? Delete Chapter
router.put('/UpdateChapter',updateChapter); //? Update Chapter


module.exports = router;
