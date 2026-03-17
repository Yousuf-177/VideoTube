import mongoose, { Schema } from "mongoose";

// either of one { "video" , "comment" , "tweet"} and others will be assigned as null
const likeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Videos",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
