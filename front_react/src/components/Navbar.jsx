import React, { useEffect, useState } from "react";
import AuthUser from "../pageauth/AuthUser";
import axios from "axios";

const Navbar = () => {
    const endpoint = "http://localhost:8000/api/auth/logout";

    const { getToken, getLogout, getUser, getRol } = AuthUser();

    // Cierra sesión de usuario
    const logoutUser = async () => {
        await axios.post(endpoint, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        }).then(response => {
            getLogout();
        }).catch(error => {
        })
    }

    // Muestra menú si está logueado o no
    const renderLinks = () => {
        if (getToken()) {
            return (
                <>
                    <button onClick={logoutUser} type="button" className="w-28 py-2 text-sm font-medium rounded-full border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white">
                        Cerrar Sesión
                    </button>
                    <button type="button" className="w-24 py-2 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-black hover:bg-lime-600 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-600">
                        {getUser().name}
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <a href="/login">
                        <button type="button" className="w-28 py-2 text-sm font-medium rounded-full border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white">
                            Iniciar Sesión
                        </button>
                    </a>
                    <a href="/register">
                        <button type="button" className="w-24 py-2 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-black hover:bg-lime-600 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-600">
                            Regístrate
                        </button>
                    </a>
                </>
            )
        }
    }

    // Muestra menú según rol
    const renderLinksRol = () => {
        if (getRol() === 1) {
            return (
                <>
                    <a href="/administrador" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Administrador</a>
                    <a href="/administrador/panel" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Panel</a>
                </>
            );
        } else if (getRol() === 2) {
            return (
                <>
                    <a href="/cliente" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Cliente</a>
                </>
            );
        } else if (getRol() === 3) {
            return (
                <>
                    <a href="/gestorComplejo" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Gestor de Complejo</a>
                    <a href="/gestorComplejo/miComplejo" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Mi Complejo</a>
                    <a href="/gestorComplejo/misCanchas" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Mis Canchas</a>
                    <a href="/gestorComplejo/misTurnos" classNameName="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">Mis Turnos</a>
                </>
            );
        }
        return null;
    };

    return (
        <header className="dark:bg-neutral-900">
            <div className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
                <nav className="my-4 relative max-w-[66rem] w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-2.5 md:px-4 lg:mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="px-4 md:px-0 flex justify-between items-center">
                        {/* Logo */}
                        <div>
                            <a className="flex items-center justify-center rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Home">
                                <img className="w-36 h-auto block dark:hidden" src="/logoLight.png" alt="deporturnos" />
                                <img className="w-36 h-auto hidden dark:block" src="/logoDark.png" alt="deporturnos" />
                            </a>
                        </div>
                        {/* Logo */}

                        <div className="md:hidden flex gap-3 items-center">
                            {/* Botones de Sesión*/}
                            <div className="flex items-center gap-x-3 py-1 md:col-span-3">
                                {renderLinks()}
                            </div>
                            {/* Botones de Sesión */}

                            {/* Menú desplegable */}
                            <button type="button" className="hs-collapse-toggle flex justify-center items-center size-10 border border-gray-200 text-gray-500 rounded-full md:order-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-navbar-header-floating-collapse" aria-expanded="false" aria-controls="hs-navbar-header-floating" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-header-floating">
                                <svg className="hs-collapse-open:hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                                <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                            {/* Menú desplegable */}
                        </div>
                    </div>

                    <div id="hs-navbar-header-floating" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-navbar-header-floating-collapse">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-0 md:mt-0 py-2 md:py-0 md:ps-7">
                            <a className="py-0.5 md:py-0 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-gray-800 font-medium text-gray-800 focus:outline-none dark:border-neutral-200 dark:text-neutral-200" href="/" aria-current="page">Inicio</a>
                            {renderLinksRol()}
                        </div>
                    </div>

                    {/* Botones de Sesión */}
                    <div className="md:col-span-3 hidden md:flex md:ml-3 md:gap-x-3">
                        {renderLinks()}
                    </div>
                    {/* Botones de Sesión */}

                </nav>
            </div>
        </header>
    )
}

export default Navbar;