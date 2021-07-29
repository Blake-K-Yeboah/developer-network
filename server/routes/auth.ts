import express from "express";

// Middleware
import { validateRegisterInput } from "../middleware/validation";

// Auth Controller
import AuthController from "../controllers/AuthController";

// Define Router
const router = express.Router();

// Register Route
router.post("/register", validateRegisterInput, AuthController.registerUser)

// Export Router
export default router;