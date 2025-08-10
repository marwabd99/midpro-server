import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

import verifyToken from "../middleware/verifyToken.js";

// שליפת כל הנכסים
router.get("/", getProducts);

// שליפת נכס לפי מזהה
router.get("/:id", getProductById);

// יצירת נכס חדש
router.post("/", createProduct);

// מחיקת נכס לפי מזהה
router.delete("/:id", deleteProduct);
// הוספת נכס - רק למשתמש מחובר
router.post("/", verifyToken, createProduct);

// מחיקת נכס - רק למשתמש מחובר
router.delete("/:id", verifyToken, deleteProduct);

export default router;
