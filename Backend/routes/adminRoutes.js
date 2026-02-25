import express from "express";
import {
  createAdminItem,
  getAdminItems,
  deleteAdminItem,
  updateAdminItem
} from "../controllers/Admin.Controller.js";

const router = express.Router();

router.post("/:category", createAdminItem);
router.get("/:category", getAdminItems);
router.put("/:category/:id", updateAdminItem);   // ✅ ADDED
router.delete("/:category/:id", deleteAdminItem);

export default router;