const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasseordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET USER
router.get("/getUser", authMiddleware, getUserController);

// UPDATE USER
router.put("/updateUser", authMiddleware, updateUserController);

// UPDATE USER PASSWORD
router.post("/updatePassword", authMiddleware, updatePasseordController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

//DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
