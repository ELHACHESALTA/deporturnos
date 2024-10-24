import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import AuthUser from "./AuthUser";

const ProtectedRoutes = () => {
    const {getToken, isTokenValid} = AuthUser();
    if(!getToken() || !isTokenValid()){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default ProtectedRoutes;