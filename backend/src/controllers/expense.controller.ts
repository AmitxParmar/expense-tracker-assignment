import type { Request, Response, NextFunction } from "express";
import Expense from "../models/Expense";
import AuditLog from "../models/AuditLog";
import { logAudit } from "../helpers/logAudit";



// 1. Employee: Add Expense
export const addExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, category, date, notes } = req.body;
        if (!amount || !category) {
            return res.status(400).json({ message: "Amount and category are required" });
        }
        const expense = await Expense.create({
            amount,
            category,
            date: date ? new Date(date) : undefined,
            notes,
            user: req.user.id,
        });
        
        await logAudit({
            action: "Expense Created",
            details: `Expense #${expense._id} created by user ${req.user.id}`,
            user: req.user.id,
        });
        res.status(201).json({ success: true, expense });
    } catch (err) {
        next(err);
    }
};

// 2. Employee: View Own Expenses
export const getMyExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json({ success: true, expenses });
    } catch (err) {
        next(err);
    }
};

// 3. Admin: View All Expenses (with filter)
export const getAllExpenses =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status, category, user, from, to } = req.query;
            const filter: any = {};
            if (status) filter.status = status;
            if (category) filter.category = category;
            if (user) filter.user = user;
            if (from || to) {
                filter.date = {};
                if (from) filter.date.$gte = new Date(from as string);
                if (to) filter.date.$lte = new Date(to as string);
            }
            const expenses = await Expense.find(filter)
                .populate("user", "name email")
                .sort({ date: -1 });
            res.json({ success: true, expenses });
        } catch (err) {
            next(err);
        }
    };


// 4. Admin: Change Expense Status
export const changeExpenseStatus =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!["pending", "approved", "rejected"].includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }
            const expense = await Expense.findById(id);
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            const oldStatus = expense.status;
            expense.status = status;
            await expense.save();
            await logAudit({
                action: "Expense Status Changed",
                details: `Expense #${expense._id} status changed from ${oldStatus} to ${status} by admin ${req.user.id}`,
                user: req.user.id,
            });
            res.json({ success: true, expense });
        } catch (err) {
            next(err);
        }
    };

// 5. Admin: Insights - Total Expenses Per Category (Bar Chart)
export const expensesPerCategory =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Expense.aggregate([
                { $group: { _id: "$category", total: { $sum: "$amount" } } },
                { $sort: { total: -1 } },
            ]);
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    };

// 6. Admin: Insights - Expenses Over Time (Monthly Breakdown)
export const expensesOverTime =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Expense.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                        },
                        total: { $sum: "$amount" },
                    },
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
            ]);
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    };

// 7. Admin: View Audit Logs
export const getAuditLogs =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const logs = await AuditLog.find()
                .populate("user", "name email")
                .sort({ timestamp: -1 })
                .limit(200);
            res.json({ success: true, logs });
        } catch (err) {
            next(err);
        }
    };
