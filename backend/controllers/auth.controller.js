import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js"

const registerUser = async (req, res) => {
    try {
        
        const {fullName, username, email, password} = req.body;
        if(!fullName || !username || !email || !password) {
            return res.status(400).json({ error: "All feilds are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username })

        if(existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        const existingEmail = await User.findOne({ email })

        if(existingEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be 6 characters long." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username, 
            email,
            password: hashedPassword
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in registering user", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ error: "All feilds are required" });
        }
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })
    } catch (error) {
        console.log("Error in Logging in  user", error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out user", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getCurrentUser = async (req, res) => {
        return res.status(200).json( req.user )
}
export { 
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}
