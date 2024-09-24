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
        const user = fetchUserInfo();
        return user;
    }

    const fetchUserInfo = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) return null;
        let str = token;
        let result = str.replace(/^["']|["']$/g, '');
        const response = await fetch('http://localhost:8000/api/user', {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${result}`,
            },
        });
        
        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            console.error('Error al obtener información del usuario');
        }
    };

    const getRol = async () => {
        const userData = await fetchUserInfo();
        const rol = userData.idRol;
        return rol;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = async (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));

        setToken(token);

        const rol = await getRol();

        if(rol === 1){
            navigate('/administrador');
        }
        if(rol === 2){
            navigate('/cliente');
        }
        if(rol === 3){
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
        getToken, getRol, getUser, getLogout 
    }
}

export default AuthUser;