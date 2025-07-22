import jwt from "jsonwebtoken";
import User from "../models/User";
import { createError } from "../utils/error";
import type { CustomJwtPayload, Roles } from "../types/types";

import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as CustomJwtPayload;

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return next(createError(401, "Not authorized, user not found"));
            }

            // Assign only the required properties to req.user
            req.user = {
                id: user.id,
                email: user.email ?? "",
                role: user.role
            };

            next();
        } catch (error) {
            console.error(error);
            return next(createError(401, "Not authorized, token failed"));
        }
    } else {
        return next(createError(401, "Not authorized, no token"));
    }
});

export const authorize = (role: Roles) => {
    return (req: Request, res: Request, next: NextFunction) => {
        if (req.user.role !== role) {
            return next(
                createError(
                    403,
                    `User role ${req.user.role} is not authorized to access this route`
                )
            );
        }
        next();
    };
};