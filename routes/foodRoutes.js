const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getByIdFoodController,
  getFoodByRestaurantController,
} = require("../controllers/foodController");

const router = express.Router();

//ROUTES
// CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD
router.get("/getAll", authMiddleware, getAllFoodController);

// GET FOOD DETAILS
router.get("/get/:id", authMiddleware, getByIdFoodController);

// GET FOOD BY RESTURANT
router.get("/getByRsturant/:id", authMiddleware, getFoodByRestaurantController);

module.exports = router;
