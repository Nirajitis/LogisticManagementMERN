import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);