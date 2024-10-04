import React, { useEffect, useState } from "react";
import AuthUser from "../pageauth/AuthUser";
import axios from "axios";

const Navbar = () => {
    const endpoint = "http://localhost:8000/api/auth/logout";

    const { getToken, getLogout, getUser, getRol } = AuthUser();

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

    // para mostrar menu si está logueado o no
    const renderLinks = () => {
        if(getToken()){
            return (
                <>
                    <li>
                        <button onClick={logoutUser} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
                    </li>
                    <li>
                        <p>{getUser().name}</p>
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
        if (getRol() === 1) {
            return (
                <>
                    <li>
                        <a href="/administrador" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Administrador</a>
                    </li>
                    <li>
                    <a href="/administrador/panel" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Panel</a>
                    </li>
                </>
            );
        } else if (getRol() === 2) {
            return (
                <li>
                    <a href="/cliente" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cliente</a>
                </li>
            );
        } else if (getRol() === 3) {
            return (
                <>
                <li>
                    <a href="/gestorComplejo" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gestor de Complejo</a>
                </li>
                <li>
                    <a href="/gestorComplejo/miComplejo" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Mi Complejo</a>
                </li>
                <li>
                    <a href="/gestorComplejo/misCanchas" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Mis Canchas</a>
                </li>
                <li>
                    <a href="/gestorComplejo/misTurnos" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Mis Turnos</a>
                </li>
                </>
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