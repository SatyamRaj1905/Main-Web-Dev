// db.ts
import mongoose, { model, Schema } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const contentTypes = ["youtube", "twitter"]; // ✅ fixed spelling
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});
const linkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});
export const contentModel = model("Content", contentSchema);
export const userModel = model("User", userSchema);
export const linkModel = model("Link", linkSchema);
//# sourceMappingURL=db.js.map