import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const LayoutAdministrador = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (getRol() !== 1){
            navigate('/');
        }
    });
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LayoutAdministrador;