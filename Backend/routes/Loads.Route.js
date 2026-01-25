import express from "express";
import {
  createLoad,
  getAllLoads,
  updateLoad,
  deleteLoad
} from "../controllers/Loads.Controller.js";

const router = express.Router();

router.post("/", createLoad);
router.get("/", getAllLoads);
router.put("/:id", updateLoad);
router.delete("/:id", deleteLoad);

export default router;
