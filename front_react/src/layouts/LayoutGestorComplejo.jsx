import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const LayoutGestorComplejo = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (getRol() !== 3){
            navigate('/');
        }
    });
    
    return (
        <div className="dark:bg-neutral-900 min-h-screen flex flex-col min-w-[500px]">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LayoutGestorComplejo;