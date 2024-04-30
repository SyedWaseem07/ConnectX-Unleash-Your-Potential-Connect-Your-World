// Dependency
import { Router } from "express";

// Middleware
import { verifyUser } from "../middlewares/verifyUser.js"

// Controller Functions
import {
    getNotifications,
    deleteNotifications
} from "../controllers/notification.controller.js"

const router = Router();

router.get("/", verifyUser, getNotifications);
router.delete("/delete", verifyUser, deleteNotifications);

export default router;