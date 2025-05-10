import express from "express";
const router = express.Router();
import { getFeedPost, likePost, getUserPosts } from "../Controllers/posts.controller.js";
import { verifyToken } from "../Middleware/auth.middleware.js";

// read
router.get("/", verifyToken, getFeedPost);
router.get("/:userId/posts", getUserPosts);

// update 
router.patch("/:id/like", verifyToken, likePost);

export default router;