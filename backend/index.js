import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes/adminRoutes.js";
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
const PORT = process.env.PORT || 4000


const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


app.use("/api/admin", adminRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})