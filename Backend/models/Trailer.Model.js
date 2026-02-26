import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema({

 unitNumber: {
  type: String,
  required: true,
  unique: true
 },

 plateNumber: {
  type: String,
  required: true,
  unique: true
 },

 type: String,
 registrationNumber: String,

 status: {
  type: String,
  default: "Active"
 }

}, { timestamps: true });

export default mongoose.model("Trailer", trailerSchema);
