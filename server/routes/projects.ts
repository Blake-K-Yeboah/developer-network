import express from "express";

// Authentication Middleware
import authenticate from "../middleware/authenticate";

// Projects Controller
import ProjectsController from "../controllers/ProjectsController";

// Validation Middleware
import { validateProjectInput } from "../middleware/validation";

// Object ID Middleware
import checkObjectId from "../middleware/checkObjectId";

// Define Router
const router = express.Router();

// @route GET api/projects
// @desc Get all projects
// @access Private
router.get("/", authenticate, ProjectsController.getAllProjects);

// @route GET api/projects/:id
// @desc Get project by id
// @access Private
router.get("/:id", authenticate, checkObjectId, ProjectsController.getProjectById);

// @route POST api/projects/create
// @desc Create Project
// @access Private
router.post("/create", authenticate, validateProjectInput, ProjectsController.createProject);

// @route DELETE api/projects/":id
// @desc Delete Project
// @access Private
router.delete("/:id", authenticate, ProjectsController.deleteProject);

// Export Router
export default router;