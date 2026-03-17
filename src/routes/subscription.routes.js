import { Router } from "express";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT); // all subscription routes require authentication

router
  .route("/c/:channelId")
  .post(toggleSubscription)
  .get(getUserChannelSubscribers);
router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router;
