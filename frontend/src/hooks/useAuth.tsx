import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, fetchMe, logoutUser } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

// React Query hook for auth operations
export const useAuth = () => {
    const queryClient = new QueryClient();
    const navigate = useNavigate();
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

    const logout = useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            localStorage.clear();
            queryClient.clear();
            document.cookie = "";
            toast.success(data.message);
            navigate("/login");
        },
        onError: (error) => toast.error(`Logout Error: ${error.message}`),
    });

    return {
        user: data?.data,
        logout,
        isLoading,
        error,
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") ?? "{}"),
        login: loginMutation,
        register: registerMutation,
        refetchUser,
    }

}