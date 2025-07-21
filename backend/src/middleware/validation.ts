import { body, validationResult } from "express-validator";
import { createError } from "../utils/error";
import type { NextFunction, Request, Response } from "express";

export const validateRegistration = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(400, errors?.array()[0]?.msg));
        }
        next();
    },
];

export const validateLogin = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(400, errors?.array()[0]?.msg));
        }
        next();
    },
];