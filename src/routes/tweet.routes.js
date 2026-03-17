import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  getAllTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT); // all tweet routes require authentication

router.route("/").post(createTweet).get(getAllTweets);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
