import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../env";
import { getOneUser } from "../services/user.service";

// Extend Express Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Log the incoming authorization header
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, Env.secretKey) as {
      id: string;
      email: string;
    };

    console.log("Decoded Token:", decoded);

    // Fetch the user from the database
    const user = await getOneUser({ uuid: decoded.id });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach the user to the request object for downstream use
    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    // Handle JWT errors and other potential errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.error("Authentication Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
