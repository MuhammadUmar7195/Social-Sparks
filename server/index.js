import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import env from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./Config/connectionDB.js";
const app = express();
env.config();

// Environment variable
const port = process.env.PORT;
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

// custom routes
import authRoute from "./Routes/auth.route.js";
app.use("/api/auth", authRoute);

// Server & DB setup
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await connectDB(database);
  } catch (error) {
    console.log("The DB & server error : ", error.message);
  }
}

start();

app.get("/test", (req, res) => {
  res.send(`<center>Server is running on port ${port}<center/>`)
})