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
                    <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                        <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle whitespace-nowrap min-w-24 max-w-auto py-1 px-1 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-black hover:bg-lime-600 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-600" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            <div className="flex items-center">
                                <img className="w-6 h-auto rounded-full max-w-xs flex-shrink-0 mr-2" src="/fotoPerfil.jpg" alt="Avatar" />
                                <div className="flex items-center">
                                    <span className="">{getUser().name}</span>
                                </div>
                                <svg className="ml-2 w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path
                                    d="m6 9 6 6 6-6"></path></svg>
                            </div>
                        </button>
                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 divide-y divide-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-with-dividers">
                            <div className="py-3 px-4 border-gray-200 dark:border-neutral-700">
                                <p className="text-sm text-gray-500 dark:text-neutral-400">Sesión iniciada como:</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">{getUser().email}</p>
                            </div>
                            {renderLinksRol()}
                            <div className="p-1 space-y-0.5">
                                <span className="block pt-2 pb-1 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500">
                                    Configuración
                                </span>
                                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                    Mi Perfil
                                </a>
                            </div>
                            <div className="p-1 space-y-0.5">
                                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>
                                    Contacto
                                </a>
                            </div>
                            <div className="p-1 space-y-0.5">
                                <button onClick={logoutUser} type="button" className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700">
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>

                </>
            )
        } else {
            return (
                <>
                    <a href="/register">
                        <button type="button" className="whitespace-nowrap min-w-24 max-w-auto py-2 px-3 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-black hover:bg-lime-600 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-600">
                            Regístrate
                        </button>
                    </a>
                    <a href="/login">
                        <button type="button" className="whitespace-nowrap min-w-28 max-w-auto py-2 px-3 text-sm font-medium rounded-full border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white">
                            Iniciar Sesión
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
                    <div className="p-1 space-y-0.5">
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/administrador">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                            Administrador
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/administrador/panel">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 17v4" /><path d="m15.2 4.9-.9-.4" /><path d="m15.2 7.1-.9.4" /><path d="m16.9 3.2-.4-.9" /><path d="m16.9 8.8-.4.9" /><path d="m19.5 2.3-.4.9" /><path d="m19.5 9.7-.4-.9" /><path d="m21.7 4.5-.9.4" /><path d="m21.7 7.5-.9-.4" /><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" /><path d="M8 21h8" /><circle cx="18" cy="6" r="3" /></svg>
                            Panel
                        </a>
                    </div>
                </>
            );
        } else if (getRol() === 2) {
            return (
                <>
                    <div className="p-1 space-y-0.5">
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/cliente">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                            Cliente
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/cliente/verCanchas">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>                            
                            Ver Canchas
                        </a>
                    </div>
                </>
            );
        } else if (getRol() === 3) {
            return (
                <>
                    <div className="p-1 space-y-0.5">
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                            Gestor de Complejo
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/miComplejo">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                            Mi Complejo
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/misCanchas">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                            Mis Canchas
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/misTurnos">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            Mis Turnos
                        </a>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm bg-white dark:bg-neutral-900">
            <nav className="my-4 relative max-w-[66rem] w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:items-center md:justify-between md:py-2.5 md:px-4 lg:mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                <div className="px-4 md:px-0 flex justify-between items-center">
                    {/* Logo */}
                    <a className="w-[150px] flex items-center justify-center rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Home">
                        <img className="h-auto block dark:hidden" src="/logoLight.png" alt="deporturnos" />
                        <img className="h-auto hidden dark:block" src="/logoDark.png" alt="deporturnos" />
                    </a>
                    {/* Logo */}

                    {/* Botones de Sesión*/}
                    <div className="flex items-center gap-x-3 py-1 md:col-span-3">
                        {renderLinks()}
                    </div>
                    {/* Botones de Sesión */}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;