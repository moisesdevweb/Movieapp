import { Router } from "express";
import {
  register,
  login,
  getUserStats,
  getMe,
  updateProfile,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.get("/stats", authenticate, getUserStats);
router.put("/update", authenticate, updateProfile);

export default router;
