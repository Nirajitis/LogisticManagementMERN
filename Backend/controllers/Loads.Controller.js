import Load from "../models/Loads.Model.js";

// CREATE LOAD
export const createLoad = async (req, res) => {
  try {
    const savedLoad = await Load.create(req.body);

    res.status(201).json({
      success: true,
      message: "Load created successfully",
      data: savedLoad
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL LOADS
export const getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: loads.length,
      data: loads
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE LOAD
export const updateLoad = async (req, res) => {
  try {
    const updatedLoad = await Load.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLoad) {
      return res.status(404).json({
        success: false,
        message: "Load not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedLoad
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE LOAD
export const deleteLoad = async (req, res) => {
  try {
    const deletedLoad = await Load.findByIdAndDelete(req.params.id);

    if (!deletedLoad) {
      return res.status(404).json({
        success: false,
        message: "Load not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Load deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
