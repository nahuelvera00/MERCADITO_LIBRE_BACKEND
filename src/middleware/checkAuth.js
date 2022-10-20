import jwt from "jsonwebtoken";
import pool from "../database/database";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await pool.query(
        `SELECT id,name,email FROM users WHERE id = ?`,
        decoded.id
      );
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Invalid Action" });
    }
  }

  if (!token) {
    const error = new Error("Invalid token");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
