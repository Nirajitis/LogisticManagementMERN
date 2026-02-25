import mongoose from "mongoose";

const adminItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("AdminItem", adminItemSchema);