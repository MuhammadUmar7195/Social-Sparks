import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = await Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();

        const post = await Post.find();
        res.status(200).json({ success: true, body: post });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const getFeedPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, body: posts });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.findById(userId);
        res.status(200).json({ success: true, body: posts });
    } catch (error) {
        res.status(404).json({ error: err.message });
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedLikedPost = await Post.findByIdAndUpdate(
            id,
            { like: post.likes },
            { new: true }
        );
        res.status(200).json({ success: true, body: updatedLikedPost });
    } catch (error) {
        res.status(404).json({ error: err.message });
    }
}