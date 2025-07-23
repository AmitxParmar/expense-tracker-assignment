import { useQuery } from "@tanstack/react-query";
import { getMyExpenses } from "@/services/expensesServices"; // or wherever your file is

export const useMyExpenses = () => {
    return useQuery({
        queryKey: ["expenses", "my"],
        queryFn: getMyExpenses,
        staleTime: 1000 * 60 * 5, // optional
    });
};