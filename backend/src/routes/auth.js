import express from "express";
import { getUserById, signin } from "../controllers/authController.js";
import { verifyAccessToken } from "../utils/verifyToken.js";

const authRoutes = express.Router();

authRoutes.post("/auth/signin", signin);
const signout = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("loggedIn");
  res.clearCookie("idUser");
  res.clearCookie("idCRM");

  return res.status(200).json({
    msg: "Logout successful.",
    success: true,
  });
};
authRoutes.post("/auth/logout", signout);
export default authRoutes;
authRoutes.get("/auth/user",  getUserById); // New route for getting user by ID
