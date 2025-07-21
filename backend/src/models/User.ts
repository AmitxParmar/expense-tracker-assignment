import { model, Schema } from "mongoose";
import type { IUser } from "../../types/types";


const userSchema = new Schema<IUser>({
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