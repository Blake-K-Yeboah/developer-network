// JWT Module
import jwt from "jsonwebtoken";

// Types
import { NextFunction, Response } from "express";
import { AuthRequest } from "../config/interface";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
    const secret: any = process.env.JWT_SECRET;

   const authHeader = req.headers.authorization;

   if (authHeader) {
      const token = authHeader.split("Bearer ")[1];

      if (token) {
         try {
            const user: any = jwt.verify(token, secret);
            req.user = user;
            next();
         } catch (err) {
            return res.status(401).json({ msg: "Invalid/Expired token" });
         }
      } else {
         return res.status(401).json({ msg: "Authentication token must be 'Bearer [token]'" });
      }
   } else {
      return res.status(401).json({ msg: "Must supply a jwt token in authorization header" });
   }
}