import { fetchMe, login, refreshToken, register } from "../controllers/auth.controller";
import { Router } from "express";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.post("/fetch-me", protect, fetchMe)

export default router;