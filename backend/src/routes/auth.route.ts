import { login, refreshToken, register } from "../controllers/auth.controller";
import { Router } from "express";
import { validateLogin, validateRegistration } from "../middleware/validation";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);

export default router;