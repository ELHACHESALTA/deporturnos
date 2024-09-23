import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const {setToken, getToken} = AuthUser();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const endpoint = "http://localhost:8000/api/auth/login";

    useEffect(()=>{
        if(getToken()){
            navigate('/');
        }
    }, []);
    
    const submitLogin = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, {email, password}).then(({data})=> {
            if(data.success){
                setToken(
                    data.user,
                    data.token,
                    data.user.idRol
                )
            } else {
                setMessage("Correo electrónico y contraseña incorrectos");
            }
        });
    }
    
    return (
        <div className="flex-grow">
            <h1 className="text-center text-blue-800 mb-10 mt-5">DEPORTURNOS</h1>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div>
                    {message !== ""  &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{message}</span>
                    </div>}
                </div>

                <button onClick={submitLogin} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</button>
                <span className="ml-10 sm:mt-5"><a href="/register" className="font-medium text-blue-700 text-primary-600 hover:text-blue-800 dark:text-primary-500">Crear cuenta</a></span>
            </form>
        </div>
    )
}

export default Login;