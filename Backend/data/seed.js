import mongoose from "mongoose";
import dotenv from "dotenv";
import Load from "../models/Loads.Model.js";
import loadsSample from "./loads.sample.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");

    // Clear existing loads
    await Load.deleteMany();

    // Insert sample data
    await Load.insertMany(loadsSample);

    console.log("✅ Sample loads inserted");

    process.exit();

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
