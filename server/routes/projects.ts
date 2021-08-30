import express from "express";

// Authentication Middleware
import authenticate from "../middleware/authenticate";

// Projects Controller
import ProjectsController from "../controllers/ProjectsController";

// Define Router
const router = express.Router();

// @route GET api/projects
// @desc Get all projects
// @access Private
router.get("/", authenticate, ProjectsController.getAllProjects);

// @route GET api/projects/:id
// @desc Get project by id
// @access Private
router.get("/:id", authenticate, ProjectsController.getProjectById);

// Export Router
export default router;