import mongoose from "mongoose";

const loadSchema = new mongoose.Schema(
  {
    loadNumber: {
      type: String,
      required: true,
      trim: true
    },

    workOrder: String,

    customer: {
      type: String,
      required: true,
      trim: true
    },

    driver: String,
    truckNum: String,
    trailerNum: String,

    status: {
      type: String,
      enum: [
        "Open",
        "Pending",
        "Dispatched",
        "On Route",
        "Loading",
        "Unloading",
        "In Yard",
        "Delivered",
        "Completed",
        "Closed"
      ],
      default: "Open"
    },

    pickup: {
      shipper: String,
      street: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: String,
      date: Date,
      notes: String
    },

    delivery: {
      consignee: String,
      street: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: String,
      date: Date,
      notes: String
    },

    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Indexes
loadSchema.index({ loadNumber: 1 });
loadSchema.index({ status: 1 });

const Load = mongoose.model("Load", loadSchema);

export default Load;
