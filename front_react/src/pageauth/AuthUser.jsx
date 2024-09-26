import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";


const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token;
    }
    
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        //console.log(user.idRol);
        return user;
    }

    const getRol = () => {
        const user = getUser();
        var rol = null;
        if(user !== null){
            rol = user.idRol;
        }
        return rol;
    }
    

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());

    //console.log(user);

    const saveToken = (user, token, rol) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('rol', JSON.stringify(rol));

        setUser(user);
        setToken(token);
        setRol(rol);

        if(getRol() === 1){
            navigate('/administrador');
        }
        if(getRol() === 2){
            navigate('/cliente');
        }
        if(getRol() === 3){
            navigate('/gestorComplejo');
        }
    }

    const getLogout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    return {
        setToken: saveToken,
        token,
        user,
        rol,
        getToken, getRol, getUser, getLogout 
    }
}

export default AuthUser;