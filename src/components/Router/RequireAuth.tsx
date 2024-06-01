import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";

interface Props {
    allowedRoles: number
}

const RequireAuth = ({ allowedRoles }: Props) => {
    const accountContext = useContext(AccountContext)
    const location = useLocation();
        
    return (
        // allowedRoles === accountContext.account?.ac_role
        1===1
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;