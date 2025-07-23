import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeExpenseStatus } from "@/services/expensesServices";

export const useChangeExpenseStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string | undefined; status: string }) =>
            changeExpenseStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", "all"] });
        },
    });
};