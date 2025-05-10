import express from "express";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import env from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./Config/connectionDB.js";
import { register } from "./Controllers/auth.controller.js";
import { createPost } from "./Controllers/posts.controller.js";
import Post from "./Models/Post.js";
import User from "./Models/User.js";
import { posts, users } from "./Data/index.js";
const app = express();
env.config();

// Environment variable
const port = process.env.PORT || 6001;
const database = process.env.DB_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(cors());
app.use("assets", express.static(path.join(__dirname, "./Public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//custom routes with file 
app.use("/api/auth/register", upload.single("picture"), register);
app.use("/api/auth/posts", upload.single("picture"), createPost);

// custom routes
import authRoute from "./Routes/auth.route.js";
import userRoute from "./Routes/users.route.js";
import postRoute from "./Routes/posts.route.js";

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// Server & DB setup
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await connectDB(database);
    /*One time data insertion in database*/
    // User.insertMany(users);
    // Post.insertMany(posts);
  } catch (error) {
    console.log("The DB & server error : ", error.message);
  }
}

start();

app.get("/test", (req, res) => {
  res.send(`<center>Server is running on port ${port}<center/>`)
})