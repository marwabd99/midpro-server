import mongoose from "mongoose";

// הגדרת הסכמה (schema) של המשתמש
const userSchema = new mongoose.Schema(
  {
    // אימייל של המשתמש - חובה, ייחודי
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // סיסמה של המשתמש - חובה
    password: {
      type: String,
      required: true,
    },
  },
  {
    // מוסיף שדות createdAt ו־updatedAt אוטומטית
    timestamps: true,
  }
);

// יצירת מודל בשם "User" על פי הסכמה
const User = mongoose.model("User", userSchema);

export default User;
