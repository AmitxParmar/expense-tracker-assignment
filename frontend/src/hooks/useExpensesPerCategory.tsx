import { useQuery } from "@tanstack/react-query";
import { getExpensesPerCategory } from "@/services/expensesServices";

export const useExpensesPerCategory = () => {
    return useQuery({
        queryKey: ["expenses", "insights", "category"],
        queryFn: getExpensesPerCategory,
    });
};