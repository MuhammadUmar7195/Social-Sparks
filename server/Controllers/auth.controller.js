import jwt from "jsonwebtoken";
import argon from "argon2"
import User from "../Models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const passwordHash = await argon.hash(password);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, body: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Login user 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            success: true,
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


