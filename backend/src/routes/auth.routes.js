import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";
import loginRateLimitMiddleware from "../middleware/loginRateLimit.js";

const router = Router();
router.post("/register", authController.register);
router.post("/login", loginRateLimitMiddleware, authController.login);
router.get("/me", auth, authController.getMe);
router.post("/logout", auth, authController.logout);
router.post("/change-password", auth, authController.changePassword);

export default router;
