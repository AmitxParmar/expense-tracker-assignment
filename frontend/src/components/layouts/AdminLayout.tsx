"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Receipt, BarChart3, FileText, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"
import { ExpenseList } from "../ExpenseList"
import { mockExpenses, mockUsers, } from "@/lib/mock-data"
import { InsightsView } from "../InsightsView"
import { AuditLogsView } from "../AuditLogsView"
import type { IUser } from "@/types/types"

interface AdminLayoutProps {
    currentUser: IUser
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function AdminLayout({ currentUser, activeTab, setActiveTab }: AdminLayoutProps) {
    const totalExpenses = mockExpenses.length
    const totalAmount = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const pendingExpenses = mockExpenses.filter((expense) => expense.status === "pending")
    const approvedExpenses = mockExpenses.filter((expense) => expense.status === "approved")
    const rejectedExpenses = mockExpenses.filter((expense) => expense.status === "rejected")

    const tabs = [
        { id: "all-expenses", label: "All Expenses", icon: Receipt },
        { id: "insights", label: "Insights", icon: BarChart3 },
        { id: "audit-logs", label: "Audit Logs", icon: FileText },
    ]

    return (
        <div className="space-y-6">
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
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
                                <p className="text-2xl font-bold">{pendingExpenses.length}</p>
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
                                <p className="text-2xl font-bold">{approvedExpenses.length}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                                <p className="text-2xl font-bold">{rejectedExpenses.length}</p>
                            </div>
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                                <p className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "employee").length}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-600" />
                        </div>
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
            {activeTab === "all-expenses" && (
                <Card>
                    <CardHeader>
                        <CardTitle>All Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ExpenseList expenses={mockExpenses} showEmployee={true} isAdmin={true} />
                    </CardContent>
                </Card>
            )}

            {activeTab === "insights" && <InsightsView />}

            {activeTab === "audit-logs" && <AuditLogsView />}
        </div>
    )
}
