import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({

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

 make: String,
 model: String,

 registrationNumber: {
  type: String,
  required: true
 },

 status: {
  type: String,
  default: "Active"
 }

}, { timestamps: true });

export default mongoose.model("Truck", truckSchema);
