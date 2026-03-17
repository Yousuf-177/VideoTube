import mongoose from "mongoose";
import { Video } from "../models/videos.models.js";
import { Subscription } from "../models/subscriptions.models.js";
import { Like } from "../models/likes.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const channelStats = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $group: {
        _id: null,
        totalVideos: { $sum: 1 },
        totalViews: { $sum: "$views" },
        totalLikes: { $sum: { $size: "$likes" } },
      },
    },
  ]);

  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });

  const stats = {
    totalVideos: channelStats[0]?.totalVideos || 0,
    totalViews: channelStats[0]?.totalViews || 0,
    totalLikes: channelStats[0]?.totalLikes || 0,
    totalSubscribers,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        likes: 0,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
