import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyToken = async (req, res, next) => {
  let token;

  // בדיקה אם יש Authorization header שמתחיל ב-"Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // שליפת הטוקן מה-header (אחרי המילה Bearer)
      token = req.headers.authorization.split(" ")[1];

      // אימות הטוקן וקבלת המידע ממנו
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // שליפת המשתמש ממסד הנתונים בלי הסיסמה
      req.user = await User.findById(decoded.id).select("-password");

      // מעבר לפונקציה הבאה
      next();
    } catch (error) {
      res.status(401);
      throw new Error("לא מורשה, טוקן לא תקין");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("לא מורשה, אין טוקן");
  }
};

export default verifyToken;
