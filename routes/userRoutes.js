import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";

// יצירת router חדש
const router = express.Router();

// נקודת קצה להרשמה: POST /api/users/register
router.post("/register", registerUser);

// נקודת קצה להתחברות: POST /api/users/login
router.post("/login", loginUser);
router.get("/", getAllUsers);

export default router;
