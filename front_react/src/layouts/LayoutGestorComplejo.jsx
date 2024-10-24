import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
import Loading from "../components/Loading/Loading";

const LayoutGestorComplejo = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();
    const [isValidRole, setIsValidRole] = useState(false);
    
    useEffect(()=>{
        if (getRol() !== 3){
            navigate('/');
        } else {
            setIsValidRole(true);
        }
    });
    
    return (
        <div className="dark:bg-neutral-900 min-h-screen flex flex-col min-w-[500px]">
            <Navbar />
            {isValidRole ? <Outlet/> : <Loading/>}
            <Footer/>
        </div>
    )
}

export default LayoutGestorComplejo;