
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import { Connection } from './config/ConnectDB.js';
Connection();
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors(
  {
    origin: ['http://localhost:4200']
}
));
app.use(userRoutes);
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}...`))
