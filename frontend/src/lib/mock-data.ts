export interface User {
    id: string
    name: string
    email: string
    role: "employee" | "admin"
}

export interface Expense {
    id: string
    employeeId: string
    description: string
    amount: number
    category: string
    date: string
    status: "pending" | "approved" | "rejected"
    receiptUrl?: string
    createdAt: string
    updatedAt: string
}

export const mockUsers: User[] = [
    {
        id: "emp-1",
        name: "John Smith",
        email: "john.smith@company.com",
        role: "employee",
    },
    {
        id: "emp-2",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "employee",
    },
    {
        id: "admin-1",
        name: "Mike Wilson",
        email: "mike.wilson@company.com",
        role: "admin",
    },
]

export const mockExpenses: Expense[] = [
    {
        id: "exp-1",
        employeeId: "emp-1",
        description: "Office supplies for Q1",
        amount: 150.0,
        category: "office-supplies",
        date: "2024-01-15",
        status: "approved",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
    },
    {
        id: "exp-2",
        employeeId: "emp-1",
        description: "Team lunch meeting",
        amount: 85.5,
        category: "meals",
        date: "2024-01-14",
        status: "rejected",
        createdAt: "2024-01-14T12:00:00Z",
        updatedAt: "2024-01-15T09:15:00Z",
    },
    {
        id: "exp-3",
        employeeId: "emp-1",
        description: "Software license renewal",
        amount: 299.99,
        category: "software",
        date: "2024-01-13",
        status: "pending",
        createdAt: "2024-01-13T14:30:00Z",
        updatedAt: "2024-01-13T14:30:00Z",
    },
    {
        id: "exp-4",
        employeeId: "emp-2",
        description: "Conference travel expenses",
        amount: 1250.0,
        category: "travel",
        date: "2024-01-12",
        status: "approved",
        createdAt: "2024-01-12T09:00:00Z",
        updatedAt: "2024-01-14T16:20:00Z",
    },
    {
        id: "exp-5",
        employeeId: "emp-2",
        description: "Marketing materials",
        amount: 75.25,
        category: "marketing",
        date: "2024-01-11",
        status: "pending",
        createdAt: "2024-01-11T11:15:00Z",
        updatedAt: "2024-01-11T11:15:00Z",
    },
    {
        id: "exp-6",
        employeeId: "emp-2",
        description: "Training course fee",
        amount: 450.0,
        category: "training",
        date: "2024-01-10",
        status: "approved",
        createdAt: "2024-01-10T13:45:00Z",
        updatedAt: "2024-01-10T15:20:00Z",
    },
]
