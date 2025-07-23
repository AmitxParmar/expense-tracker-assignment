import axiosInstance from "@/lib/axios";
import type { IAuditLog, ICustomResponse, IExpense } from "@/types/types";

// Base API URL
const BASE_URL = "/expenses";

// Add a new expense (Employee)
export const addExpense = async (expenseData: IExpense): Promise<ICustomResponse<Partial<IExpense>>> => {
    const { data } = await axiosInstance.post(`${BASE_URL}/`, expenseData);
    return data;
};

// Get my expenses (Employee)
export const getMyExpenses = async (): Promise<ICustomResponse<IExpense[]>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/my`);
    return data;
};

// Get all expenses (Admin)
export const getAllExpenses = async () => {
    const { data } = await axiosInstance.get(`${BASE_URL}/`);
    return data;
};

// Change expense status (Admin)
export const changeExpenseStatus = async (id: string | undefined, status: string) => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/${id}/status`, { status });
    return data;
};

// Get expenses per category (Insights)
export const getExpensesPerCategory = async () => {
    const { data } = await axiosInstance.get(`${BASE_URL}/insights/category`);
    return data;
};

// Get expenses over time (Insights)
export const getExpensesOverTime = async () => {
    const { data } = await axiosInstance.get(`${BASE_URL}/insights/time`);
    return data;
};

// Get audit logs (Admin)
export const getAuditLogs = async (): Promise<ICustomResponse<IAuditLog[]>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/audit/logs`);
    return data;
};
