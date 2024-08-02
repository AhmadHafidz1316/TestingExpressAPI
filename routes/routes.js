const express = require("express");
const router = express.Router();
const { storeCategory, getCategory, getIdCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const { registerUser, loginUser } = require("../controllers/authControllers")
const { authMiddleware, permissionUser } = require("../middleware/userMiddleware")

// Category
router.post("/category", authMiddleware, storeCategory);
router.get("/category", authMiddleware,  permissionUser("Admin"), getCategory)
router.get("/category/:id", authMiddleware, getIdCategory)
router.put("/category/:id", authMiddleware, updateCategory)
router.delete("/category/:id", authMiddleware, deleteCategory)

// Auth
router.post("/register", registerUser)
router.post("/login", loginUser)


module.exports = router
