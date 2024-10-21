import React, { useEffect, useState } from "react";
import AuthUser from "../pageauth/AuthUser";
import axios from "axios";
import { ChevronDown, Settings, Headset, LogOut, CircleUserRound, MonitorCog, Search, Calendar, Star, House, Trophy, Clock } from 'lucide-react';

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
                                    <span className="text-white dark:text-neutral-900">{getUser().name}</span>
                                </div>
                                <ChevronDown className="ml-2 w-5 h-5 shrink-0 text-white dark:text-neutral-900" />
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
                                    <Settings className="shrink-0 size-4" />
                                    Mi Perfil
                                </a>
                            </div>
                            <div className="p-1 space-y-0.5">
                                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                    <Headset className="shrink-0 size-4" />
                                    Contacto
                                </a>
                            </div>
                            <div className="p-1 space-y-0.5">
                                <button onClick={logoutUser} type="button" className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700">
                                    <LogOut className="shrink-0 size-4" />
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
                        <button type="button" className="whitespace-nowrap w-28 h-[33.6px] max-w-auto py-1 px-1 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-white dark:text-neutral-900 hover:bg-lime-600 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-600">
                            Regístrate
                        </button>
                    </a>
                    <a href="/login">
                        <button type="button" className="whitespace-nowrap w-28 h-[33.6px] max-w-auto py-1 px-1 text-sm font-medium rounded-full border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white">
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
                            <CircleUserRound className="shrink-0 size-4" />
                            Administrador
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/administrador/panel">
                            <MonitorCog className="shrink-0 size-4" />
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
                            <CircleUserRound className="shrink-0 size-4" />
                            Cliente
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/cliente/verCanchas">
                            <Search className="shrink-0 size-4" />
                            Buscar Canchas
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/cliente/misTurnosCliente">
                            <Calendar className="shrink-0 size-4" />
                            Mis Turnos
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/cliente/misFavoritos">
                            <Star className="shrink-0 size-4" />
                            Mis Favoritos
                        </a>
                    </div>
                </>
            );
        } else if (getRol() === 3) {
            return (
                <>
                    <div className="p-1 space-y-0.5">
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo">
                            <CircleUserRound className="shrink-0 size-4" />
                            Gestor de Complejo
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/miComplejo">
                            <House className="shrink-0 size-4" />
                            Mi Complejo
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/misCanchas">
                            <Trophy className="shrink-0 size-4" />
                            Mis Canchas
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/gestorComplejo/misTurnos">
                            <Clock className="shrink-0 size-4" />
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
            <nav className="w-full mx-auto max-w-[66rem] px-2">
                <div className=" bg-white border border-gray-200 rounded-3xl my-4 p-2  md:items-center md:justify-between  dark:bg-neutral-800 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a className="w-[150px] flex items-center justify-center rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Home">
                            <img className="h-auto block dark:hidden" src="/logoLight.png" alt="deporturnos" />
                            <img className="h-auto hidden dark:block" src="/logoDark.png" alt="deporturnos" />
                        </a>
                        {/* Logo */}

                        {/* Botones de Sesión*/}
                        <div className="flex items-center gap-x-3 md:col-span-3">
                            {renderLinks()}
                        </div>
                        {/* Botones de Sesión */}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;