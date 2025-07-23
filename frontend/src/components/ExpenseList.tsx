import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, X, Eye } from "lucide-react"
import { toast } from "sonner"
import { Receipt } from "lucide-react" // Declared Receipt here
import type { IExpense, IUser } from "@/types/types"

import { useChangeExpenseStatus } from "@/hooks/useChangeExpenseStatus"


interface ExpenseListProps {
    expenses: IExpense[]
    showEmployee?: boolean
    isAdmin?: boolean
    user: IUser
}

export function ExpenseList({ expenses, user, showEmployee = false, isAdmin = false }: ExpenseListProps) {

    const statusChange = useChangeExpenseStatus()


    const handleStatusChange = (expenseId: string | undefined, newStatus: "approved" | "rejected") => {
        if (!expenseId || !newStatus) {
            toast.error("expenseId or status required");
        }
        //setExpenseStatuses((prev) => ({ ...prev, [expenseId]: newStatus }))
        statusChange.mutate({ id: expenseId, status: newStatus }, {
            onSuccess: (data) => {
                toast.success(data.message);
            }
        })
        toast.success(`Expense ${newStatus} successfully`)
    }

    // const getEmployee = (employeeId: string) => {
    //      return mockUsers.find((user) => user.id === employeeId)
    // }

    const getStatusVariant = (status: string | undefined) => {
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

    console.log("expenses length", expenses?.length, expenses)
    if (expenses?.length === 0) {
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
                    {expenses && expenses?.map((expense) => {



                        return (
                            <TableRow key={expense?._id}>
                                <TableCell className="font-medium">{new Date(expense?.date).toLocaleDateString()}</TableCell>
                                <TableCell>{expense?.notes}</TableCell>
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
                                                    {user?.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("") || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{user?.name || "Unknown"}</span>
                                        </div>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Badge variant={getStatusVariant(expense?.status)} className="capitalize">
                                        {expense.status}
                                    </Badge>
                                </TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        {expense.status === "pending" ? (
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleStatusChange(expense?._id, "approved")}
                                                    className="text-green-600 hover:text-green-700"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleStatusChange(expense?._id, "rejected")}
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
