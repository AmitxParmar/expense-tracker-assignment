import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/services/expensesServices";

export const useAuditLogs = async (role: "admin" | "employee") => {

    return useQuery({
        queryKey: ["expenses", "audit", "logs"],
        queryFn: getAuditLogs,
        enabled: role === "admin" && role !== undefined,
    });
};
