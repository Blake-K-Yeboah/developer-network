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

// @route POST api/users/:id/follow
// @desc Follow User
// @access Private
router.post("/:id/follow", authenticate, UsersController.followUser);

// @route POST api/users/:id/unfollow
// @desc Unfollow user
// @access Private
router.post("/:id/unfollow", authenticate, UsersController.unfollowUser);

// Export Router
export default router;
