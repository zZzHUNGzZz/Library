import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";

interface Props {
    allowedRoles: number
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
    const location = useLocation();

    return (
        allowedRoles > 0
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;