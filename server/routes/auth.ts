import express from "express";

// Middleware
import { validateRegisterInput, validateLoginInput, validateResetPasswordFromCodeInput, validateResetPassword } from "../middleware/validation";
import authenticate from "../middleware/authenticate";

// Auth Controller
import AuthController from "../controllers/AuthController";

// Define Router
const router = express.Router();

// @route POST api/auth/register
// @desc Register a new user
// @access Public
router.post("/register", validateRegisterInput, AuthController.registerUser);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", validateLoginInput, AuthController.login);

// @route POST api/auth/request-password-reset
// @desc Request a password reset
// @access Public
router.post("/request-password-reset", AuthController.requestPasswordReset);

// @route PUT api/auth/reset-password-from-code
// @desc Reset password using verification code emailed
// @access Private
router.put("/reset-password-from-code", validateResetPasswordFromCodeInput, AuthController.resetPasswordFromCode);

// @route PUT api/auth/reset-password
// @desc Reset password after being logged in
// @access Private
router.put("/reset-password", authenticate, validateResetPassword, AuthController.resetPassword)

// @route PUT api/auth/update-details
// @desc Update user's details
// @access Private
router.put("/update-details", authenticate, AuthController.updateUser);

// Export Router
export default router;