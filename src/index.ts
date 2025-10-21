import express ,{Response} from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
// import serverless from "serverless-http";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRouter";
import { loginRouter } from "./routes/loginRouter";
import { v2 as cloudinary } from "cloudinary";
import { addHeroImageRouter } from "./routes/addHeroImageRouter";

const MONGODB_URL = "mongodb+srv://mzainmumtaz99_db_user:dyt5kZSNRjq2x9Yl@cluster0.245yfua.mongodb.net";

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Database connection error:", error);
  });
  // Allowed origins (add as many as you want)
const allowedOrigins = [
  "https://demosekaispacehotelapp.vercel.app"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "https://demosekaispacehotelapp.vercel.app",
 

//     credentials: true,
//   })
// );
// 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const router = Router();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", registerRouter);
app.use("/v2", loginRouter);
app.use("/v3", addHeroImageRouter);


app.get("/", (_req, res:Response) => {
  res.send("✅ Backend running successfully !");
});
// app.use("/", router);
// export const handler = serverless(app);