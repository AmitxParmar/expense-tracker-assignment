import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, FileText, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { getAuditLogs } from "@/services/expensesServices"
import { useQuery } from "@tanstack/react-query"
import type { IAuditLog } from "@/types/types"

export function AuditLogsView() {
    const { user } = useAuth()
    const { data, isLoading, error } = useQuery({
        queryKey: ["expenses", "audit", "logs"],
        queryFn: getAuditLogs,
        enabled: user?.role === "admin" && user.role !== undefined,
    });

    const auditLogs: IAuditLog[] = data?.data || [];

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
    console.log(error)
    if (isLoading) return <div className="px-4 py-2">Loading</div>;
    if (error) return <div className="px-4 py-2 text-red-500">{(error as Error).message}</div>

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
                        {auditLogs.length === 0 && <div className="text-center text-muted-foreground">No audit logs found.</div>}
                        {auditLogs.map((log, idx) => {
                            const logUser = log.user;
                            return (
                                <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0">{getActionIcon(log.action)}</div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-xs">
                                                        {logUser?.name
                                                            ? logUser.name.split(" ").map((n: string) => n[0]).join("")
                                                            : "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{logUser?.name || "Unknown User"}</span>
                                                {getActionBadge(log.action)}
                                            </div>
                                            <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                                        </div>

                                        <p className="text-sm text-gray-700 mb-2">{log.details}</p>
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
                            <p className="text-sm text-muted-foreground">Approvals</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">
                                {auditLogs.filter((log) => log.action === "expense_rejected").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Rejections</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {auditLogs.filter((log) => log.action === "expense_submitted").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Submissions</p>
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
