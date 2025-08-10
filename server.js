import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
 
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //useNewUrlParse
  //הפרמטר הזה אומר ל־
  //Mongoose
  //להשתמש
  //parser
  // חדש יותר שתומך בכתובות מורכבות בצורה תקנית

  //useUnifiedTopology
  // זה מאפשר ל־Mongoose להשתמש ב־מנגנון ניהול חיבורים חדש ואחיד.

  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log("MongoDB connection error:", error));
