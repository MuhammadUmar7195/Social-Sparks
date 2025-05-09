import express from "express";
const router = express.Router();
import { getUser, getUserFriend, addRemoveFriend } from "../Controllers/user.controller";
import { verifyToken } from "../Middleware/auth.middleware";

//Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriend);

//update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;