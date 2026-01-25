import mongoose from "mongoose";

const adminItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  }
});

export default mongoose.model("AdminItem", adminItemSchema);
