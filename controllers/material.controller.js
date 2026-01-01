const Material = require("../models/material.model");
const fs = require("fs");
const path = require("path");

// Upload study material
exports.uploadMaterial = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const {
      title,
      description,
      subject,
      class: className,
      type,
      tags,
    } = req.body;

    if (!title || !description || !subject || !className || !type) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const material = await Material.create({
      title,
      description,
      subject,
      class: className,
      type,
      tags: tags ? tags.split(",") : [],
      fileUrl: req.file.path,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully",
      data: material,
    });
  } catch (error) {
    next(error);
  }
};

// Get all study materials
exports.getAllMaterials = async (req, res, next) => {
  try {
    const { subject, class: className, type } = req.query;

    const filter = {};

    if (subject) filter.subject = subject;
    if (className) filter.class = className;
    if (type) filter.type = type;

    const materials = await Material.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    next(error);
  }
};

// Get single study material by ID
exports.getMaterialById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    next(error);
  }
};

// Download study material file
exports.downloadMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    const filePath = path.resolve(material.fileUrl);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found on server",
      });
    }

    res.download(filePath, material.fileName);
  } catch (error) {
    next(error);
  }
};

// Delete study material
exports.deleteMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    const filePath = material.fileUrl;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await material.deleteOne();

    res.status(200).json({
      success: true,
      message: "Study material deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
