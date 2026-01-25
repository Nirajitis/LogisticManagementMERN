import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import loadsRouter from "./routes/Loads.Route.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/loads", loadsRouter);
app.use("/api/admin", adminRoutes); 

// Global error safety
process.on("unhandledRejection", err => {
  console.error("UNHANDLED ERROR:", err.message);
  process.exit(1);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
