// Dependency
import jwt from "jsonwebtoken"

// Model
import { User } from "../models/user.model.js"

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ error: "Unauthorized request" });
        }

        const decodedInfo = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedInfo) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const currentUser = await User.findById(decodedInfo.userId).select("-password");

        if(!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        console.log("Error in verifyUser middleware", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}