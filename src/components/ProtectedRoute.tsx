import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type {JSX} from "react";

export const ProtectedRoute = ({
                                   children,
                                   allowedRoles,
                               }: {
    children: JSX.Element;
    allowedRoles?: string[];
}) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.some((r) => user.roles.includes(r))) return <Navigate to="/dashboard" replace />;

    return children;
};
