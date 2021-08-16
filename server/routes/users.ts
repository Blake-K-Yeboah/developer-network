import express from "express";

// Authentication Middleware
import authenticate from "../middleware/authenticate";

// Users Controller
import UsersController from "../controllers/UsersController";

// Define Router
const router = express.Router();

// @route GET api/users
// @desc Get all users
// @access Private
router.get("/", authenticate, UsersController.getAllUsers);

// @route GET api/users/:id
// @desc Get user by id
// @access Private
router.get("/:id", authenticate, UsersController.getUserById);

// Export Router
export default router;
