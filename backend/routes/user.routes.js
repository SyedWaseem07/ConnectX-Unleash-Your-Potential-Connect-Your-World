// Dependency
import { Router } from "express";

// Middleware
import { verifyUser } from "../middlewares/verifyUser.js";

// Controller Functions
import {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers,
    updateUserProfile,
    updateUserProfileImage
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/:username", verifyUser, getUserProfile);
router.get("/suggested", verifyUser, getSuggestedUsers);
router.post("/follow/:id", verifyUser, followUnfollowUser);
router.post("/update", verifyUser, updateUserProfile);
router.post("/updateImages", verifyUser, updateUserProfileImage);


export default router;