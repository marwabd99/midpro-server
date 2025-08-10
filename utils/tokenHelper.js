import jwt from "jsonwebtoken";

// פונקציה ליצירת טוקן עבור המשתמש
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // תוקף של 30 ימים
  });
};

export default generateToken;
