import User from "../models/userModel.js"; // מודל המשתמש (MongoDB)
import bcrypt from "bcryptjs"; // להצפנת סיסמאות והשוואתן
import generateToken from "../utils/tokenHelper.js"; // פונקציה ליצירת JWT Token

// ✅ שליפת כל המשתמשים (למטרות ניהול)
export const getAllUsers = async (req, res) => {
  try {
    // שליפת כל המשתמשים בלי להחזיר את הסיסמה
    const users = await User.find({}, "-password");

    // אם אין משתמשים בכלל
    if (users.length === 0) {
      return res.status(404).json({ message: "לא נמצאו משתמשים" });
    }

    res.json(users);
  } catch (error) {
    console.error("❌ שגיאה בשליפת משתמשים:", error);
    res.status(500).json({ message: "שגיאה בשליפת משתמשים" });
  }
};

// ✅ רישום משתמש חדש
export const registerUser = async (req, res) => {
  const { email, password } = req.body; // קבלת אימייל וסיסמה מהלקוח

  try {
    // בדיקות קלט בסיסיות
    if (!email || !password) {
      return res.status(400).json({ message: "חובה למלא אימייל וסיסמה" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "הסיסמה חייבת להכיל לפחות 6 תווים" });
    }

    // בדיקה אם המשתמש כבר קיים במסד
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "משתמש כבר קיים" });
    }

    // הצפנת הסיסמה לפני השמירה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת המשתמש החדש ושמירתו ב-DB
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // החזרת פרטי המשתמש + JWT Token
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      token: generateToken(newUser._id), // יוצרת טוקן עם מזהה המשתמש
    });
  } catch (error) {
    console.error("❌ שגיאה בהרשמה:", error);
    res.status(500).json({ message: "שגיאה בהרשמה" });
  }
};

// ✅ התחברות משתמש קיים
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // קבלת פרטי התחברות מהלקוח

  try {
    // בדיקות קלט
    if (!email || !password) {
      return res.status(400).json({ message: "חובה למלא אימייל וסיסמה" });
    }

    // חיפוש המשתמש במסד הנתונים
    const user = await User.findOne({ email });

    // בדיקת התאמת סיסמה
    if (user && (await bcrypt.compare(password, user.password))) {
      // אם הכול תקין — מחזירים פרטים + טוקן
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // אם האימייל או הסיסמה שגויים
      res.status(401).json({ message: "אימייל או סיסמה לא נכונים" });
    }
  } catch (error) {
    console.error("❌ שגיאה בהתחברות:", error);
    res.status(500).json({ message: "שגיאה בהתחברות" });
  }
};
