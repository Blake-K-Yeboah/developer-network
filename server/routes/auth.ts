import express from "express";

// Middleware
import { validateRegisterInput, validateLoginInput } from "../middleware/validation";

// Auth Controller
import AuthController from "../controllers/AuthController";

// Define Router
const router = express.Router();

// Register Route
router.post("/register", validateRegisterInput, AuthController.registerUser)

// Login Route
router.post("/login", validateLoginInput, AuthController.login);

// Export Router
export default router;