// Dependencies
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"

// Routes
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notifications.routes.js"

// Utility Function
import { connectToDB } from "./db/connectMongoDb.js"

dotenv.config();  // to use .env variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json({ limit: "5mb" }));  // to parse req.body
app.use(express.urlencoded({ extended: true }))  // to parse form data
app.use(cookieParser()) // to set and access cookies in clients browser.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at ${process.env.PORT}`)
    connectToDB();
})