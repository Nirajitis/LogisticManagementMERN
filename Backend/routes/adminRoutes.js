import express from "express";
import AdminItem from "../models/AdminItem.js";

const router = express.Router();

// GET items
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  const items = await AdminItem.find({ category });

  res.json({ data: items });
});

// ADD item
router.post("/:category", async (req, res) => {
  const { category } = req.params;
  const { name } = req.body;

  const item = new AdminItem({
    name,
    category
  });

  await item.save();

  res.json({ data: item });
});

// DELETE item
router.delete("/:category/:id", async (req, res) => {
  const { id } = req.params;

  await AdminItem.findByIdAndDelete(id);

  res.json({ success: true });
});

export default router;
