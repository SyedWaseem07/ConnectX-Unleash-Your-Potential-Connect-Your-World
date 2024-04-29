import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import { connectToDB } from "./db/connectMongoDb.js"
import cookieParser from "cookie-parser";

dotenv.config();  // to use .env variables
const app = express();

app.use(express.json());  // to parse req.body
app.use(express.urlencoded({ extended: true }))  // to parse form data
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at ${process.env.PORT}`)
    connectToDB();
})