import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String, //cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // If user left the password form this error will appear
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // when not modifying the password this function should not run

  this.password = await bcrypt.hash(this.password, 10); // must run only when we are saving or modifying the password

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // try {
  //   console.log(password,this.password)
  //   // 'this.password' refers to the stored hash from the database
  //   return await bcrypt.compare(password, this.password); // IMPORTANT: bcrypt.compare() is the correct function
  // } catch (error) {
  //   console.error("Error comparing passwords:", error); // Log any errors during comparison
  //   return false; // Or throw an error, depending on your error handling
  // }
};

userSchema.methods.generateAccessToken = function () {
  // short term => access Token
  // For longer - term => refresh token (stored in database )

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET, // secret message with encoded data to help get above details
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // time after access token will expired will
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // secret message with encoded data to help get above details
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // time after access token will expired will
  );
};

export const User = mongoose.model("User", userSchema);
