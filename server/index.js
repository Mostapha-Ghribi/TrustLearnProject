
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.js');
const courseRoutes = require('./routes/courses.js')
const videoRoutes = require('./routes/video.js')
const chapterRoutes = require('./routes/chapters.js')
const lessonRoutes = require('./routes/lessons.js')
const categoryRoutes = require('./routes/categories.js')
const  Connection  = require('./config/ConnectDB.js');
const {Verify } = require('../server/html_template_mail/verify.js')

Connection();
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/chapter',chapterRoutes);
app.use('/api/lesson',lessonRoutes);
app.use('/api/video',videoRoutes);
app.get('/',function (req, res) {
  res.send('Welcome')
});
app.get('/verify-email*',function (req, res) {
  res.writeHead(302, {
    'Location': `${req.headers.host}/`
  });
  res.end();
});
  
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}...`))

