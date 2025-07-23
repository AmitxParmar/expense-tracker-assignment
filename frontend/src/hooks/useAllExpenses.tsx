import { useQuery } from "@tanstack/react-query";
import { getAllExpenses } from "@/services/expensesServices";

export const useAllExpenses = (role: "admin" | "employee") => {
    return useQuery({
        queryKey: ["expenses", "all"],
        queryFn: getAllExpenses,
        
    });
};