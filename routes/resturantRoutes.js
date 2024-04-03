const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantById,
  deleteResturantByIdController,
} = require("../controllers/resturantController");

const router = express.Router();

//ROUTES

// CREATE RESTORANT
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTORANTS LIST
router.get("/getAll", getAllResturantController);

// GET  RESTORANTS BY ID
router.get("/get/:id", getResturantById);

// DELETE RESTURANT BYID
router.get("/delete/:id", authMiddleware, deleteResturantByIdController);

module.exports = router;
