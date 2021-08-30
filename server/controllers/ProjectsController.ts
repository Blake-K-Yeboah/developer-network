//  Express Types
import { Response } from "express";

// Interfaces
import { AuthRequest, IProject } from "../config/interface";

// Project Model
import { Project } from "../models/project";

// Get All Projects
const getAllProjects = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Fetch all projects from db
    const projects: IProject[] = await Project.find({});

    // Return all projects
    return res.json({
        count: projects.length,
        results: projects.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1)
    });
}

// Get Project By ID
const getProjectById = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Find Project
    const project: IProject = await Project.findById(req.params.id);

    // Check if project exists
    if (project) {
        return res.json(project);
    } else {
        return res.status(404).json({ msg: "Project doesn't exist"})
    }
}

// Create Project
const createProject = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Check if user has a project with same name
    const sameNameProject: IProject = await Project.find({ user: req.user!._id, name: req.body.name });

    if (sameNameProject) {
        return res.status(400).json({ msg: "You already have a project with that name." });
    }

    // TODO: Upload project image
    // TODO: Create and save project

    return res.json({ msg: "Hi"})
}

export default {
    getAllProjects,
    getProjectById,
}