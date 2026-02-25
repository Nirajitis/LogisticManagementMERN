import express from "express";
import {
 addTruck,
 getTrucks,
 addTrailer,
 getTrailers
} from "../controllers/Vehicle.Controller.js";

const router = express.Router();

// Trucks
router.post("/truck", addTruck);
router.get("/trucks", getTrucks);

// Trailers
router.post("/trailer", addTrailer);
router.get("/trailers", getTrailers);

export default router;
