import { useQuery } from "@tanstack/react-query";
import { getExpensesOverTime } from "@/services/expensesServices";

export const useExpensesOverTime = (role: "admin" | "employee") => {
    return useQuery({
        queryKey: ["expenses", "insights", "time"],
        queryFn: getExpensesOverTime,
        enabled: role === "admin"
    });
};
