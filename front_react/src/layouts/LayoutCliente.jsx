import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const LayoutCliente = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (getRol() !== 2){
            navigate('/');
        }
    });
    return (
        <div className="dark:bg-neutral-900 min-h-screen flex flex-col text-white">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LayoutCliente;