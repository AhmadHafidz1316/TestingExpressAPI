const express = require("express");
const router = express.Router();
const { storeCategory, getCategory, getIdCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");

// Category
router.post("/category", storeCategory);
router.get("/category", getCategory)
router.get("/category/:id", getIdCategory)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)

// Auth


module.exports = router
