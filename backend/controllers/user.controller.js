// Dependencies
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

// Models
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js"


const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ error: "Username required to get profile" });
        }

        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in fetching user profile");
        res.status(500).json({ error: "Internal server error" });
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow or unfollow yourself" });
        }

        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found." });
        }

        const isFollowing = await currentUser.following.includes(id);
        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            })

            await newNotification.save();
            res.status(200).json({ message: "User followed successfully" });
        }

    } catch (error) {
        console.log("Error in follow or unfollow user");
        res.status(500).json({ error: "Internal server error" });
    }
}

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ])
        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);
        suggestedUsers.forEach(user => user.password = null);
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in get suggested users");
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { fullName, username, email, currentPassword, newPassword, bio, link } = req.body;
        if (!fullName && !username && !email && !currentPassword && !newPassword && !bio && !link) {
            return res.status(400).json({ message: "Please provide details to update" })
        }
        let user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({ error: "User not found" });

        if (currentPassword) {
            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordCorrect)
                return res.status(400).json({ error: "Incorrect current password provided" });
        }

        if (newPassword && newPassword.length < 6)
            return res.status(400).json({ error: "New password must be atleat 6 characters long" });

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
        }
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;

        user = await user.save();
        user.password = null;
        res.status(200).json(user);
    } catch (error) {
        console.log(error, "Error in updating user profile");
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateUserProfileImage = async (req, res) => {
    try {
        let { profileImg, coverImg } = req.body;
        let user = await User.findById(req.user._id);
        if (!profileImg && !coverImg) return res.status(400).json({ message: "Profile image or cover image required updation" });
        if (profileImg) {
            if (user.profileImg)
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }

        if (coverImg) {
            if (user.coverImg)
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user = await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error, "Error in updating user profile images");
        res.status(500).json({ error: "Internal server error" });
    }
}
export {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers,
    updateUserProfile,
    updateUserProfileImage
}