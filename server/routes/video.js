const express = require('express');

const {createVideo , DeleteVideo, UpdateVideo,GetVideo} = require('../controllers/video.js');

const router = express.Router();

router.post('/CreateVideo/' , createVideo);
//router.delete('/DeleteVideo/:course_id/:video_id', DeleteVideo);
//router.put('/UpdateVideo/:video_id', UpdateVideo);
//router.get('/GetVideo/:video_id', GetVideo);

module.exports = router;
