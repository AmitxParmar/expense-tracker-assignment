import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {

    if (!Boolean(isAuthenticated)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;