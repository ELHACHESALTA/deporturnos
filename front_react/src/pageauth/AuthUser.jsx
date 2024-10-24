import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const AuthUser = () => {
    const navigate = useNavigate();

    // Se Obtiene el token del sessionStorage
    const getToken = () => {
        return sessionStorage.getItem('token');
    };

    // Se valida el token
    const isTokenValid = () => {
        const token = getToken();
        if (!token) return false; 
        try {
            // Se comprueba si el token tiene 3 partes y si es decodificable
            const decoded = jwtDecode(token);
            return token.split('.').length === 3 && decoded;
        } catch (error) {
            return false;
        }
    };

    const getUser = () => {
        const token = getToken();
        if (token && isTokenValid()) {
            const decodedToken = jwtDecode(token);
            return decodedToken.user;
        }
        return null;
    };

    const getRol = () => {
        const user = getUser();
        return user ? user.idRol : null;
    };

    const saveToken = (token) => {
        sessionStorage.setItem('token', token);
        navigate('/');

        if(getRol() === 1){
            navigate('/administrador');
        }
        if(getRol() === 2){
            navigate('/cliente');
        }
        if(getRol() === 3){
            navigate('/gestorComplejo');
        }
    };

    const getLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return {
        setToken: saveToken,
        getToken,
        isTokenValid,
        getUser,
        getRol,
        getLogout,
    };
};

export default AuthUser;
