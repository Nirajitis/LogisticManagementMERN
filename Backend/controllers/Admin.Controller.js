import AdminItem from "../models/AdminItem.js";


// CREATE
export const createAdminItem = async (req, res) => {
  try {
    const { category } = req.params;

    const savedItem = await AdminItem.create({
      category,
      data: req.body
    });

    res.status(201).json({
      success: true,
      data: {
        _id: savedItem._id,
        ...savedItem.data
      }
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET ALL
export const getAdminItems = async (req, res) => {
  try {
    const { category } = req.params;

    const items = await AdminItem.find({ category })
      .sort({ createdAt: -1 });

    const formatted = items.map(item => ({
      _id: item._id,
      ...item.data
    }));

    res.json({
      success: true,
      data: formatted
    });

  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
export const updateAdminItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await AdminItem.findByIdAndUpdate(
      id,
      { data: req.body },   // 🔥 IMPORTANT — update data field
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      data: {
        _id: updated._id,
        ...updated.data
      }
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// DELETE
export const deleteAdminItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await AdminItem.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({ success: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};