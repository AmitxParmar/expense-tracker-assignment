import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis } from "recharts"
import { mockExpenses } from "../lib/mock-data"
import { useExpensesPerCategory } from "@/hooks/useExpensesPerCategory"
import { useExpensesOverTime } from "@/hooks/useExpensesOverTime"
import type { IExpense } from "@/types/types"
import { useMemo } from "react"

const chartConfig = {
    amount: {
        label: "Amount",
        color: "hsl(var(--chart-1))",
    },
    count: {
        label: "Count",
        color: "hsl(var(--chart-2))",
    },
}
type InsightsViewProps = {
    role: "admin" | "employee";
    expenses: IExpense[]
};

export function InsightsView({ role, expenses }: InsightsViewProps) {
    const { data: category } = useExpensesPerCategory();
    const { data: timeData } = useExpensesOverTime(role);

    const memoizedStatuses = useMemo(() => {
        return Object.entries(
            expenses.reduce(
                (acc, expense) => {
                    const status = expense.status ?? "unknown";
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                },
                {} as Record<string, number>
            )
        ).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
            count,
            fill: status === "approved"
                ? "#22c55e"
                : status === "pending"
                    ? "#f59e0b"
                    : status === "rejected"
                        ? "#ef4444"
                        : "#a3a3a3", // fallback color for unknown/undefined
        }));
    }, [expenses]);

    // Status distribution
    const statusData = Object.entries(
        mockExpenses.reduce(
            (acc, expense) => {
                acc[expense.status] = (acc[expense.status] || 0) + 1
                return acc
            },
            {} as Record<string, number>,
        ),
    ).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count,
        fill: status === "approved" ? "#22c55e" : status === "pending" ? "#f59e0b" : "#ef4444",
    }))

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expenses by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle>Expenses by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                            <BarChart data={category?.data}>
                                <XAxis dataKey="_id" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="total" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />

                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Expense Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                            <PieChart>
                                <Pie
                                    data={memoizedStatuses}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="count"
                                    label={({ status, count }) => `${status}: ${count}`}
                                >
                                    {memoizedStatuses.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Expenses Over Time */}
            <Card>
                <CardHeader>
                    <CardTitle>Expenses Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[400px]">
                        <LineChart data={timeData.data}>
                            <XAxis dataKey="_id.month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="var(--color-amount)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-amount)" }}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                ${mockExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Expenses</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                $
                                {mockExpenses
                                    .filter((e) => e.status === "approved")
                                    .reduce((sum, expense) => sum + expense.amount, 0)
                                    .toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">Approved Amount</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">
                                $
                                {mockExpenses
                                    .filter((e) => e.status === "pending")
                                    .reduce((sum, expense) => sum + expense.amount, 0)
                                    .toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">Pending Amount</p>
                        </div>
                    </CardContent>
                </Card>
            </div>*/}
        </div>
    )
}
