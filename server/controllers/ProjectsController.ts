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
    const sameNameProject: IProject = await Project.findOne({ user: req.user!._id, name: req.body.name });

    if (sameNameProject) {
        return res.status(400).json({ msg: "You already have a project with that name." });
    }
    
    // Uploaded file
    const file: any = req.files!.image;

    // New name for file to be saved under
    const newFileName = `${req.user!._id}-${req.body.name}.${file.name.split('.')[1]}`;

    // URL to move file to
    const moveUrl = process.env.NODE_ENV === "production" ? `./client/build/uploads/projects/${newFileName}` : `./client/public/uploads/projects/${newFileName}`;

    // Upload file
    file.mv(moveUrl, (err: any) => {
        if (err) {
            console.error(err);

            return res.status(500).json({ msg: "An error occured on the server"});
        }
    });

    // Create Project
    const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        image: req.body.description,
        user: req.user!._id
    });

    try {

        // Save Project
        const savedProject = await newProject.save();

        return res.json(savedProject);

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});

    }
}

// Delete Project
const deleteProject = async (req: AuthRequest, res: Response): Promise<Response> => {
    // Check Project Exists
    const project: IProject = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({ msg: "Project doesn't exist."});
    }

    // Check User Owns Project
    const userId = req.user!._id;

    if (project.user != userId) {
        return res.status(401).json({ msg: "You dont have permission to do that."});
    }

    // Delete Project
    try {
        await project.delete();
        return res.json(project);
    } catch (err) {
        return res.status(500).json({ msg: "An error occured on the server. Try again later."});
    }
}

export default {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
}