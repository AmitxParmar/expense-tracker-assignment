import type { Response } from "express";

export const setTokenCookie = (res: Response, token: string, refreshToken: string) => {
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
