
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import { Connection } from './config/ConnectDB.js';
Connection();
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/api',userRoutes);
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}...`))

