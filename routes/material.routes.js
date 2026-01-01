const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const materialController = require("../controllers/material.controller");

// Upload study material
router.post("/", upload.single("file"), materialController.uploadMaterial);

// Get all materials
router.get("/", materialController.getAllMaterials);

// Get single material
router.get("/:id", materialController.getMaterialById);

// Download material file
router.get("/:id/download", materialController.downloadMaterial);

// Delete material
router.delete("/:id", materialController.deleteMaterial);

module.exports = router;
