import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const LayoutGestorComplejo = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRoleAndNavigate = async () => {
            try {
                const rol = await getRol();
                if (rol !== 3) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error al obtener el rol:', error);
            }
        };
    
        fetchRoleAndNavigate();
    }, [navigate]);
    
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LayoutGestorComplejo;