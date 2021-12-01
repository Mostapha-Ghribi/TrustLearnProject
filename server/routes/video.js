const express = require('express');

const {createVideo , deleteVideo , updateVideo} = require('../controllers/video.js');

const router = express.Router();

router.post('/CreateVideo',createVideo); //? Create Video
router.delete('/DeleteVideo',deleteVideo); //? Delete Video
router.put('/UpdateVideo',updateVideo); //? Update Video

module.exports = router;
