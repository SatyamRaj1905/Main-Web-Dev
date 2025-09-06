import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { contentModel, linkModel, userModel } from "./db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";
const app = express();
const saltRounds = 10;
app.use(express.json());
app.use(cors());
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
// ---------------- ROUTES ----------------
// Signup
app.post("/api/v1/signup", async (req, res) => {
    const requireBody = z.object({
        username: z.string().min(3).max(10),
        password: z
            .string()
            .min(8)
            .max(20)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    });
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.json({ message: "Incorrect Format of Input" });
    }
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userModel.create({ username, password: hashedPassword });
        return res.status(200).json({ message: "You are signed up" });
    }
    catch (error) {
        return res.status(401).json({ message: "Sorry not able to signup" });
    }
});
// Signin
app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    const userExist = await userModel.findOne({ username });
    if (!userExist) {
        return res
            .status(404)
            .json({ message: "Username not exists please sign up first" });
    }
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (passwordMatch) {
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_USER);
        return res.status(200).json({ message: "You are signed in", token });
    }
    else {
        return res.status(403).json({ message: "Incorrect Credentials" });
    }
});
// Add content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    await contentModel.create({
        link,
        type,
        title,
        // @ts-ignore
        userId: req.userId,
        tags: [],
    });
    return res.json({ message: "Content added" });
});
// Fetch content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const content = await contentModel
        // @ts-ignore
        .find({ userId: req.userId })
        .populate("userId", "username");
    return res.json({ content });
});
// ✅ Delete content (fixed)
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await contentModel.deleteOne({
        _id: contentId,
        // @ts-ignore
        userId: req.userId,
    });
    return res.json({ message: "Deleted successfully" });
});
// Share brain
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        // @ts-ignore
        const existingLink = await linkModel.findOne({ userId: req.userId });
        if (existingLink)
            return res.json({ hash: existingLink.hash });
        const hashedLink = random(10);
        // @ts-ignore
        await linkModel.create({ hash: hashedLink, userId: req.userId });
        return res.status(200).json({ hash: hashedLink });
    }
    else {
        // @ts-ignore
        await linkModel.deleteOne({ userId: req.userId });
        return res.status(200).json({ message: "Removed Link" });
    }
});
// Get shared brain
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hashUser = req.params.shareLink;
    const link = await linkModel.findOne({ hash: hashUser });
    if (!link)
        return res.status(411).json({ message: "Sharable link not correct" });
    const content = await contentModel.find({ userId: link.userId });
    const user = await userModel.findOne({ _id: link.userId });
    if (!user)
        return res.status(411).json({ message: "User not found" });
    return res.json({ username: user.username, content });
});
//# sourceMappingURL=index.js.map