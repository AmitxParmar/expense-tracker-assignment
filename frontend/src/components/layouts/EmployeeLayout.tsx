import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Receipt, DollarSign, Clock, TrendingUp } from "lucide-react"
import { AddExpenseDialog } from "../dialogs/AddExpenseDialoag"
import { ExpenseList } from "../ExpenseList"
import type { IUser } from "@/types/types"
import { useMyExpenses } from "@/hooks/useMyExpenses"

interface EmployeeLayoutProps {
    currentUser: IUser
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function EmployeeLayout({ currentUser, activeTab, setActiveTab }: EmployeeLayoutProps) {
    const [showAddExpense, setShowAddExpense] = useState(false)
    const { data } = useMyExpenses();
    console.log(data)

    //const myExpenses = mockExpenses.filter((expense) => expense.employeeId === currentUser._id)
    const totalAmount = data?.data?.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const pendingExpenses = data?.data?.filter((expense) => expense?.status === "pending");
    const approvedExpenses = data?.data?.filter((expense) => expense?.status === "approved");

    const tabs = [
        { id: "expenses", label: "My Expenses", icon: Receipt },
        { id: "overview", label: "Overview", icon: TrendingUp },
    ]

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                                <p className="text-2xl font-bold">${totalAmount?.toFixed(2)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">{pendingExpenses?.length}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                                <p className="text-2xl font-bold">{approvedExpenses?.length}</p>
                            </div>
                            <Receipt className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Button
                            onClick={() => setShowAddExpense(true)}
                            className="w-full h-full min-h-[80px] flex flex-col items-center justify-center space-y-2"
                        >
                            <Plus className="h-6 w-6" />
                            <span>Add Expense</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "ghost"}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center space-x-2"
                        >
                            <Icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                        </Button>
                    )
                })}
            </div>

            {/* Content */}
            {activeTab === "expenses" && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>My Expenses</CardTitle>
                        <Button onClick={() => setShowAddExpense(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Expense
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {data?.success && <ExpenseList user={currentUser} expenses={data?.data} showEmployee={false} />}
                    </CardContent>
                </Card>
            )}

            {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data?.data.slice(0, 5).map((expense) => (
                                    <div key={expense._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium">{expense?.notes}</p>
                                            <p className="text-sm text-muted-foreground">{expense.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${expense.amount.toFixed(2)}</p>
                                            <Badge
                                                variant={
                                                    expense.status === "approved"
                                                        ? "default"
                                                        : expense.status === "pending"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                            >
                                                {expense.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Expense Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {data?.data && Object.entries(
                                    data?.data.reduce(
                                        (acc, expense) => {
                                            acc[expense.category] = (acc[expense.category] || 0) + expense.amount
                                            return acc
                                        },
                                        {} as Record<string, number>,
                                    ),
                                ).map(([category, amount]) => (
                                    <div key={category} className="flex items-center justify-between">
                                        <span className="capitalize">{category}</span>
                                        <span className="font-medium">${amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <AddExpenseDialog open={showAddExpense} onOpenChange={setShowAddExpense} />
        </div>
    )
}
