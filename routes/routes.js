const express = require("express");
const router = express.Router();
const { storeCategory, getCategory, getIdCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const { registerUser, loginUser } = require("../controllers/authControllers")

// Category
router.post("/category", storeCategory);
router.get("/category", getCategory)
router.get("/category/:id", getIdCategory)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)

// Auth
router.post("/register", registerUser)
router.post("/login", loginUser)


module.exports = router
