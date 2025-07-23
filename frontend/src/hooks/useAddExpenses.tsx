import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpense } from "@/services/expensesServices";

export const useAddExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", "my"] });
        },
    });
};