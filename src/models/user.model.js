import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true
    },
    image: {
      type: String,
      required: [true, "Image is required"]
    }
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

export default User;
