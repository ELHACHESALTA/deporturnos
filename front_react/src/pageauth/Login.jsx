import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const { setToken, getToken } = AuthUser();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const endpoint = "http://localhost:8000/api/auth/login";

    useEffect(() => {
        if (getToken()) {
            navigate('/');
        }
    }, []);

    const submitLogin = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, { email, password }).then(({ data }) => {
            if (data.success) {
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
        <div className="flex-grow w-96 mx-auto">
            <div className="px-2 max-w-[66rem]">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 ">
                    <div className="p-4 sm:p-7">

                        {/* Cabecera */}
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Iniciar sesión</h1>
                            <div className="flex justify-center gap-2 mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                <div>¿Aún no tiene una cuenta?</div>
                                <a className="text-lime-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-lime-500" href="/register">
                                    Regístrate aquí
                                </a>
                            </div>
                        </div>
                        {/* Cabecera */}

                        {/* Formulario */}
                        <form className="mt-5">
                            <div className="grid gap-y-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-4 dark:text-white">Correo electrónico</label>
                                    <div className="relative">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="py-3 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" aria-describedby="email-error" placeholder="Ingrese su correo electrónico" required />
                                    </div>
                                </div>
                                {/* Email */}

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm mb-4 dark:text-white">Contraseña</label>
                                    <div className="relative">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="py-3 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" aria-describedby="password-error" placeholder="Ingrese su contraseña" required />
                                    </div>
                                </div>
                                {/* Password */}

                                <div>
                                    {message !== "" &&
                                        <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                                            <span >{message}</span>
                                        </div>}
                                </div>

                                {/* Recuerdo y recuperación */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-lime-600 focus:ring-lime-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-lime-500 dark:checked:border-lime-500 dark:focus:ring-offset-gray-800" />
                                        </div>
                                        <label htmlFor="remember-me" className="text-sm dark:text-white">Recuérdame</label>
                                    </div>
                                    <a className="inline-flex items-center gap-x-1 text-sm text-lime-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-lime-500" href="#">¿Olvidaste tu contraseña?</a>
                                </div>
                                {/* Recuerdo y recuperación */}

                                <button onClick={submitLogin} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">Ingresar</button>
                            </div>
                        </form>
                        {/* Formulario */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;