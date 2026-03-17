import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//commmon middlewares
app.use(express.json({ limit: "16kb" })); //to allow all json data to come in (in limited form "16kb")
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // data in url encoded format
app.use(express.static("public")); // to serve some of our assets such as img,css,etc. to locally or config type
app.use(cookieParser());
//import

import healthCheckRoutes from "./routes/healthCheck.routes.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import tweetRoutes from "./routes/tweet.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { errorHadler } from "./middlewares/error.middlewares.js";

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/healthCheck", healthCheckRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/tweets", tweetRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use(errorHadler);

export { app };
