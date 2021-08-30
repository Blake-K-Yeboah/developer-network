// Required Modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import fileUpload from "express-fileupload";

// Initiate Express Server
const app = express();

// Dotenv Config
dotenv.config();

// Set Static Folder To React Build Folder If In Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
}
// Helmet
app.use(helmet());

// CORS middleware
app.use(cors());

// Body Parser Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// File Upload Middleware
app.use(fileUpload());

// Import Database Config
import './config/database';

// Import Routers
import AuthRouter from "./routes/auth";
import UsersRouter from "./routes/users";
import ProjectsRouter from "./routes/projects";

// Use Routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UsersRouter);
app.use("/api/projects", ProjectsRouter);

// Serve React App If In Production
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

// Port Variable
const port = process.env.PORT;

// Run Server
if (process.env.NODE_ENV !== "testing") {
    app.listen(port, () => {
       console.log("🚀 Server running on port: " + port);
    });
}

// For Testing
export default app;