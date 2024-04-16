const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//ROUTES

//CREATE CATEGORY
router.post("/create", authMiddleware, createCategoryController);

//GET CATEGORY
router.get("/getAll", getAllCategoryController);

//UPDATE CATEGORY
router.put("/update/:id", authMiddleware, updateCategoryController);

//DELETE CATEGORY
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
