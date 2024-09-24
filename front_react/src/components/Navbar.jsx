import React, { useEffect, useState } from "react";
import AuthUser from "../pageauth/AuthUser";
import axios from "axios";
import Loading from "./Loading/Loading";

const Navbar = () => {
    const endpoint = "http://localhost:8000/api/auth/logout";

    const { getToken, getLogout, getUser, getRol } = AuthUser();

    const [loading, setLoading] = useState(true);

    const logoutUser = async () => {
        await axios.post(endpoint, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
        }).then(response=>{
            getLogout();
        }).catch(error => {
        })

    } 


    const [rol, setRol] = useState(null);
    const [userName, setUserName] = useState(null);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const role = await getRol();
                setRol(role);

                const user = await getUser();
                if (user) {
                    setUserName(user.name);
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario", error);
            } finally {
                setLoading(false);
            }
        };

        if (getToken()) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [getToken, getRol, getUser]);

    // Si está cargando, mostramos la pantalla de carga
    if (loading) {
        return <Loading />;
    }

    // para mostrar menu si está logueado o no
    const renderLinks = () => {
        if(getToken()){
            return (
                <>
                    <li>
                        <button onClick={logoutUser} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
                    </li>
                    <li>
                        <p>{userName}</p>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li>
                        <a href="/login" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                    </li>
                    <li>
                        <a href="/register" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                    </li>
                </>
            )
        }
    }

    const renderLinksRol = () => {
        if (rol === 1) {
            return (
                <li>
                    <a href="/administrador" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Administrador</a>
                </li>
            );
        } else if (rol === 2) {
            return (
                <li>
                    <a href="/cliente" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cliente</a>
                </li>
            );
        } else if (rol === 3) {
            return (
                <li>
                    <a href="/gestorComplejo" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gestor de Complejo</a>
                </li>
            );
        }
        return null;
    };

    return (
        <div>
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                    <li>
                    <a href="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
                    </li>
                    {renderLinksRol()}
                    {renderLinks()}
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Navbar;