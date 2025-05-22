import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config.ts/db';

const app = express();
connectDB();

app.use(express.json())

app.use('/',  router)  // app.use es para usar todos los routers 


export default app