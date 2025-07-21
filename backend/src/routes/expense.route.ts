import { Router } from 'express';
import {
    addExpense,
    getMyExpenses,
    getAllExpenses,
    changeExpenseStatus,
    expensesPerCategory,
    expensesOverTime,
    getAuditLogs
} from '../controllers/expense.controller';

const router = Router();

// Employee routes
router.post('/', addExpense);
router.get('/my', getMyExpenses);

// Admin routes
router.get('/', getAllExpenses);
router.patch('/:id/status', changeExpenseStatus);

// Insights
router.get('/insights/category', expensesPerCategory);
router.get('/insights/time', expensesOverTime);

// Audit logs
router.get('/audit/logs', getAuditLogs);

export default router;