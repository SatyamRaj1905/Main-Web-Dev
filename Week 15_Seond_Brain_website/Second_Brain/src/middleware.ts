import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];
    // Checking header aaya v h ya nhi
    if (!header) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    if (!process.env.JWT_SECRET_USER) {
      throw new Error("JWT_SECRET_USER is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER) as { id: string };

    // @ts-ignore - extend Request type for userID
    req.userID = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
