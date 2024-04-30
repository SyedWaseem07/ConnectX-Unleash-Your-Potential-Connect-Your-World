// Dependency
import { Router } from "express"; 

// Middleware
import { verifyUser } from "../middlewares/verifyUser.js";

// Controller Functions
import {
    createPost,
    deletePost,
    likeUnlikePost,
    commentOnPost,
    getAllPosts,
    getLikedPosts,
    getFollowingPosts,
    getUserPosts
} from "../controllers/post.controller.js"

const router = Router();

router.get("/", verifyUser, getAllPosts);
router.get("/likedPosts/:id", verifyUser, getLikedPosts);
router.get("/following", verifyUser, getFollowingPosts);
router.get("/user/:username", verifyUser, getUserPosts);
router.post("/create", verifyUser, createPost);
router.post("/like/:id", verifyUser, likeUnlikePost);
router.post("/comment/:id", verifyUser, commentOnPost);
router.delete("/delete/:id", verifyUser, deletePost);

export default router;