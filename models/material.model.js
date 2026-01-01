const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Notes", "Assignment", "Exam", "Other"],
    },

    tags: {
      type: [String],
      default: [],
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);
