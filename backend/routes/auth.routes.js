// Dependency
import { Router } from "express";

// Middleware
import { verifyUser } from "../middlewares/verifyUser.js"

// Controller Functions
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/auth.controller.js"


const router = Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/getCurrentUser", verifyUser, getCurrentUser)


export default router;