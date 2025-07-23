import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, fetchMe } from "@/services/authServices";

// React Query hook for auth operations
export const useAuth = () => {

    const updateAuthState = (isAuthenticated: string) => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    };

    const isAuthenticated = !!JSON.parse(localStorage.getItem("isAuthenticated") || "false");

    const {
        isLoading,
        error,
        data,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchMe,
        enabled: isAuthenticated,
        retry: 3,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    });

    /* useEffect(() => {
      if (isAuthenticated && data.user && !isLoading) {
        navigate(`/dashboard/${data.user?.role}`);
      }
    }, [isAuthenticated]); */

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            updateAuthState("true");
        },
        onError: (error) => {
            updateAuthState("false");
            console.log(error);
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success(
                "Successfully registered! Check your email to verify your account."
            );
        },
        onError: (error) => toast.error(`Registration Error: ${error.message}`),
    });



    return {
        user: data?.data,
        isLoading,
        error,
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
        login: loginMutation,
        register: registerMutation,
        refetchUser,
    }

}