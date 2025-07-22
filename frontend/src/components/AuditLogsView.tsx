import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, FileText, CheckCircle, XCircle } from "lucide-react"
import { mockUsers } from "../lib/mock-data"

// Mock audit log data
const auditLogs = [
    {
        id: "1",
        action: "expense_approved",
        description: "Approved expense for office supplies",
        userId: "admin-1",
        targetId: "exp-1",
        timestamp: "2024-01-15T10:30:00Z",
        metadata: { amount: 150.0, category: "office-supplies" },
    },
    {
        id: "2",
        action: "expense_rejected",
        description: "Rejected expense for team lunch",
        userId: "admin-1",
        targetId: "exp-2",
        timestamp: "2024-01-15T09:15:00Z",
        metadata: { amount: 85.5, category: "meals", reason: "Exceeds policy limit" },
    },
    {
        id: "3",
        action: "expense_submitted",
        description: "New expense submitted for software license",
        userId: "emp-1",
        targetId: "exp-3",
        timestamp: "2024-01-15T08:45:00Z",
        metadata: { amount: 299.99, category: "software" },
    },
    {
        id: "4",
        action: "expense_approved",
        description: "Approved expense for conference travel",
        userId: "admin-1",
        targetId: "exp-4",
        timestamp: "2024-01-14T16:20:00Z",
        metadata: { amount: 1250.0, category: "travel" },
    },
    {
        id: "5",
        action: "expense_submitted",
        description: "New expense submitted for marketing materials",
        userId: "emp-2",
        targetId: "exp-5",
        timestamp: "2024-01-14T14:30:00Z",
        metadata: { amount: 75.25, category: "marketing" },
    },
]

export function AuditLogsView() {
    const getUser = (userId: string) => {
        return mockUsers.find((user) => user.id === userId)
    }

    const getActionIcon = (action: string) => {
        switch (action) {
            case "expense_approved":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "expense_rejected":
                return <XCircle className="h-4 w-4 text-red-600" />
            case "expense_submitted":
                return <FileText className="h-4 w-4 text-blue-600" />
            default:
                return <Clock className="h-4 w-4 text-gray-600" />
        }
    }

    const getActionBadge = (action: string) => {
        switch (action) {
            case "expense_approved":
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                        Approved
                    </Badge>
                )
            case "expense_rejected":
                return <Badge variant="destructive">Rejected</Badge>
            case "expense_submitted":
                return <Badge variant="secondary">Submitted</Badge>
            default:
                return <Badge variant="outline">{action}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Audit Logs</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {auditLogs.map((log) => {
                            const user = getUser(log.userId)
                            return (
                                <div key={log.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0">{getActionIcon(log.action)}</div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-xs">
                                                        {user?.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("") || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{user?.name || "Unknown User"}</span>
                                                {getActionBadge(log.action)}
                                            </div>
                                            <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                                        </div>

                                        <p className="text-sm text-gray-700 mb-2">{log.description}</p>

                                        {log.metadata && (
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                {log.metadata.amount && (
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        Amount: ${log.metadata.amount.toFixed(2)}
                                                    </span>
                                                )}
                                                {log.metadata.category && (
                                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded capitalize">
                                                        {log.metadata.category.replace("-", " ")}
                                                    </span>
                                                )}
                                                {log.metadata.reason && (
                                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                                        Reason: {log.metadata.reason}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {auditLogs.filter((log) => log.action === "expense_approved").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Approvals Today</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">
                                {auditLogs.filter((log) => log.action === "expense_rejected").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Rejections Today</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {auditLogs.filter((log) => log.action === "expense_submitted").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Submissions Today</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-600">{auditLogs.length}</p>
                            <p className="text-sm text-muted-foreground">Total Activities</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
