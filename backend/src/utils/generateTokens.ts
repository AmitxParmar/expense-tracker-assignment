import type { IUser } from '../../types/types';
import jwt from "jsonwebtoken";


export const generateToken = (user: IUser) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        Bun.env?.JWT_ACCESS_SECRET || "",
        { expiresIn: "30m" } // Short-lived access token
    );
};

export const generateRefreshToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET || "", {
        expiresIn: "14d",
    });
};