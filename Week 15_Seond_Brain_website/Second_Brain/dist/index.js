import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "./db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { hasRestParameter } from "typescript";
const app = express();
const saltRounds = 10;
app.use(express.json());
dotenv.config();
async function startServer() {
    if (!process.env.MONGO_DB_URI) {
        throw new Error("MONGO_DB_URI not defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected");
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    }
    catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
}
startServer();
// Register routes
app.post("/api/v1/signup", async (req, res) => {
    // Adding the zod validation 
    const requireBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    });
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.json({
            message: "Incorrect Format of Input"
        });
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userModel.create({
            username: username,
            password: hashedPassword
        });
        return res.status(200).json({
            message: "You are signed up"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Sorry not able to signup"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=index.js.map