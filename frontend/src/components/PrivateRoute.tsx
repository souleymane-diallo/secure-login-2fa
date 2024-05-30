import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface IPrivateRouteProps {
    children: ReactNode
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
    /* Locl */
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

  return children;
}
