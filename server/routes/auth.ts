import express from "express";

// Middleware
import { validateRegisterInput, validateLoginInput, validateResetPasswordFromCodeInput } from "../middleware/validation";
import authenticate from "../middleware/authenticate";

// Auth Controller
import AuthController from "../controllers/AuthController";

// Define Router
const router = express.Router();

// Register Route
router.post("/register", validateRegisterInput, AuthController.registerUser);

// Login Route
router.post("/login", validateLoginInput, AuthController.login);

// Request Password Reset
router.post("/request-password-reset", AuthController.requestPasswordReset);

// Reset Password From Code
router.put("/reset-password-from-code", validateResetPasswordFromCodeInput, AuthController.resetPasswordFromCode);

// Reset Password While Logged In
router.put("/reset-password", authenticate, AuthController.resetPassword)

// Export Router
export default router;