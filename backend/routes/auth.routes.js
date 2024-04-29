import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/auth.controller.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const router = Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/getCurrentUser", verifyUser, getCurrentUser)


export default router;