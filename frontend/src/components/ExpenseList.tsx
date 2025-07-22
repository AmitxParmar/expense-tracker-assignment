"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, X, Eye } from "lucide-react"
import { toast } from "sonner"
import { mockUsers, type Expense } from "../lib/mock-data"
import { Receipt } from "lucide-react" // Declared Receipt here

interface ExpenseListProps {
    expenses: Expense[]
    showEmployee?: boolean
    isAdmin?: boolean
}

export function ExpenseList({ expenses, showEmployee = false, isAdmin = false }: ExpenseListProps) {
    const [expenseStatuses, setExpenseStatuses] = useState<Record<string, string>>({})

    const handleStatusChange = (expenseId: string, newStatus: "approved" | "rejected") => {
        setExpenseStatuses((prev) => ({ ...prev, [expenseId]: newStatus }))
        toast.success(`Expense ${newStatus} successfully`)
    }

    const getEmployee = (employeeId: string) => {
        return mockUsers.find((user) => user.id === employeeId)
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "approved":
                return "default"
            case "pending":
                return "secondary"
            case "rejected":
                return "destructive"
            default:
                return "secondary"
        }
    }

    if (expenses.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No expenses found</p>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        {showEmployee && <TableHead>Employee</TableHead>}
                        <TableHead>Status</TableHead>
                        {isAdmin && <TableHead>Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => {
                        const employee = getEmployee(expense.employeeId)
                        const currentStatus = expenseStatuses[expense.id] || expense.status

                        return (
                            <TableRow key={expense.id}>
                                <TableCell className="font-medium">{new Date(expense.date).toLocaleDateString()}</TableCell>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize">
                                        {expense.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">${expense.amount.toFixed(2)}</TableCell>
                                {showEmployee && (
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs">
                                                    {employee?.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("") || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{employee?.name || "Unknown"}</span>
                                        </div>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Badge variant={getStatusVariant(currentStatus)} className="capitalize">
                                        {currentStatus}
                                    </Badge>
                                </TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        {currentStatus === "pending" ? (
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleStatusChange(expense.id, "approved")}
                                                    className="text-green-600 hover:text-green-700"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleStatusChange(expense.id, "rejected")}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
