import type { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export type Roles = "employee" | "admin";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date
}

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: Roles;
}