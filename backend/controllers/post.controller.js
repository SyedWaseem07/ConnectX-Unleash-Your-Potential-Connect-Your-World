// Dependency
import { v2 as cloudinary } from "cloudinary"

// Models
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js"
import { Notification } from "../models/notification.model.js";

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!text && !img) {
            return res.status(400).json({ error: "Post must have text or image" });
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error in createPost controller: ", error);
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "Unauthorized request to delete post." });
        }
        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deleting post");
        res.status(500).json({ error: "Internal server error" })
    }
}
const likeUnlikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        if (post.likes.includes(userId)) {
            // unlike
            post.likes.pop(userId);
            await post.save();
            return res.status(200).json({ message: "Unlike post successfully" });

        } else {
            // like
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: id } })
            await post.save();
            // notification
            const newNotification = new Notification({
                from: userId,
                to: post.user,
                type: 'like'
            })
            await newNotification.save();
            return res.status(200).json({ message: "Like post successfully" });
        }

    } catch (error) {
        console.log("Error in like/unlike post", error);
        res.status(500).json({ error: "Internal server error" })
    }
}
const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params;
        const userId = req.user._id;

        if (!text)
            return res.status(400).json({ error: "Text field is required" });

        const post = await Post.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });

        const comment = {
            user: userId,
            text
        }

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        console.log("Error in Commenting post");
        res.status(500).json({ error: "Internal server error" })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        })
            .populate({
                path: "comments.user",
                select: "-password"
            })

        if (posts.length === 0)
            return res.status(200).json([])
        res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getting all posts");
        res.status(500).json({ error: "Internal server error" })
    }
}

const getLikedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ error: "User not found" });

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            })

        res.status(200).json(likedPosts);
    } catch (error) {
        console.log("Error in getting liked posts");
        res.status(500).json({ error: "Internal server error" })
    }
}

const getFollowingPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user)
            return res.status(404).json({ error: "User not found" })

        const following = user.following;
        const posts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            })

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getting following posts");
        res.status(500).json({ error: "Internal server error" })
    }
}

const getUserPosts = async (req, res) => {
    try {

        const { username } = req.params;

        const foundedUser = await User.findOne({ username });
        if (!foundedUser)
            return res.status(404).json({ error: "User not found" });

        const userPosts = await Post.find({ user: { $eq: foundedUser._id } })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            })

        res.status(200).json(userPosts);

    } catch (error) {
        console.log("Error in getting user posts");
        res.status(500).json({ error: "Internal server error" })
    }
}
export {
    createPost,
    deletePost,
    likeUnlikePost,
    commentOnPost,
    getAllPosts,
    getLikedPosts,
    getFollowingPosts,
    getUserPosts
}