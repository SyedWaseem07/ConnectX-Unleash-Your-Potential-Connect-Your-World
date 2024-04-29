import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import { connectToDB } from "./db/connectMongoDb.js"

dotenv.config();
const app = express();

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at ${process.env.PORT}`)
    connectToDB();
})