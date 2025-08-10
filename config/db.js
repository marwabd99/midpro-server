import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/midprojectDB";

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ התחברות ל-MongoDB הצליחה");
  } catch (err) {
    console.error("❌ שגיאה בהתחברות ל-MongoDB: " + err.message);
    process.exit(1); // עוצר את השרת אם אין התחברות
  }
}

export default connectDB;
