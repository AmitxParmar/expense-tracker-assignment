import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, requireid: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ["employee", "admin"],
        default: "employee",
    },
    createdAt: { type: Date, default: Date.now },
});



export default model("User", userSchema);