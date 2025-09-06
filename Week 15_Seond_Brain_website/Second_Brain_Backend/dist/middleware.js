// middleware.ts
import jwt from "jsonwebtoken";
export const userMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]; // ✅ directly read the token
        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }
        if (!process.env.JWT_SECRET_USER) {
            throw new Error("JWT_SECRET_USER is not defined");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        // @ts-ignore - extend Request type for userId
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
//# sourceMappingURL=middleware.js.map