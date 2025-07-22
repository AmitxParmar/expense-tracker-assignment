import type { CustomJwtPayload } from './../types/types';
import type { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateRefreshToken, generateToken } from "../utils/generateTokens";


const setTokenCookie = (res: Response, token: string, refreshToken: string) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: isProduction ? "none" : "lax", // 'none' in production, 'lax' in development
        maxAge: 20 * 60 * 1000, // 20 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: isProduction ? "none" : "lax", // 'none' in production, 'lax' in development
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};


// Fetch Current Protected
export const fetchMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // The user ID is attached to the request by the authentication middleware
        const userId = req.user.id;

        // Fetch the user from the database, excluding the password
        const user = await User.findById(userId)
            .select("-password")

        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Send the user data
        res.status(200).json({
            success: true,
            message: "Current user data fetched successfully!",
            data: user,
        });
    } catch (error) {
        console.error("Error fetching current user:", error);
        next(createError(500, "Error fetching user data"));
    }
};


export const register = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, ...otherDetails } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return next(createError(400, "Email is already in use."));
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const verificationToken = crypto.randomBytes(20).toString("hex");

            const newUser = new User({
                email,
                password: hashedPassword,
                verificationToken,
                ...otherDetails,
            });

            newUser.save()
                .then((savedUser) => {
                    // Use toObject() to get a plain JS object without Mongoose internals
                    const { password: _, ...userDetails } = savedUser.toObject();
                    res.status(201).json({
                        success: true,
                        message:
                            "User successfully registered. Please check your email to verify your account.",
                        data: userDetails,
                    });
                })
                .catch((error) => {
                    console.error("Registration error:", error);
                    // Attempt to delete the user if any error occurred during registration
                    User.deleteOne({ email: req.body.email })
                        .then(() => {
                            console.log(
                                "User with email:",
                                req.body.email,
                                "deleted successfully due to registration error."
                            );
                        })
                        .catch((deleteError) => {
                            console.error("Error deleting user:", deleteError);
                        })
                        .finally(() => next(error));
                });
            return;

        } catch (error) {
            console.error("Registration error:", error);
            next(error);
        }
    },
];

export const login = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(createError(400, "Email and password are required"));
            }

            const user = await User.findOne({ email }).select("+password");
            if (!user || !bcrypt.compare(password, user.password!)) {
                return next(createError(401, "Invalid credentials"));
            }

            // enable email verification later

            /*    if (!user.isVerified) {
              return next(
                createError(401, "Please verify your email before logging in")
              );
            } */

            if (!process.env.JWT_ACCESS_SECRET) {
                console.log("NO JWT VARIABLEs");
                return next(createError(500, "JWT environment variable is missing"));
            }

            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user);
            setTokenCookie(res, token, refreshToken);
            console.log("login success!");
            res
                .status(200)
                .json({
                    success: true,
                    message: "Login successful",
                    data: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                });
        } catch (error) {
            console.error("Login error:", error);
            next(createError(500, "An unexpected error occurred during login"));
        }
    },
];


export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log("refreshToken triggered!!!!!!", req.cookies);
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return next(createError(401, "Refresh token not found"));
        }
        if (!process.env.JWT_REFRESH_SECRET) throw new Error("No JWT secret found!")

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as CustomJwtPayload;

        console.log("decoded refresh token");

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(createError(401, "User not found"));
        }

        const newAccessToken = generateToken(user);
        const newRefreshToken = generateRefreshToken(user);

        setTokenCookie(res, newAccessToken, newRefreshToken);

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
        });
    } catch (error: unknown) {
        console.error("Refresh token error:", error);
        if (error instanceof Error)
            if (error.name === "TokenExpiredError") {
                return next(createError(401, "Refresh token expired"));
            }
        next(createError(401, "Invalid refresh token"));
    }
};