import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import useForm from "../hooks/useForm";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal/Modal";
import { CircleCheck, CircleAlert, X } from 'lucide-react';


// se inicializan las variables que se le pasarán al hook personalizado
const initialForm = {
    name: "",
    email: "",
    password: "",
    idRol: 0,
};

// funcion donde se realizan las validaciones de los campos
const validationsForm = (form, emailExists) => {
    let errors = {};

    // expresiones regulares para los distintos campos del formulario
    let regexName = /^[A-Za-zÁ-Ýá-ýñÑ’']([A-Za-zÁ-Ýá-ýñÑ’' ]*)$/;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;


    if (!form.name.trim()) {
        errors.name = "El campo 'nombre' es obligatorio";
    } else if (!regexName.test(form.name.trim())) {
        errors.name = "El campo debe contener sólo letras y espacios";
    }

    if (!form.email.trim()) {
        errors.email = "El campo 'email' es obligatorio";
    } else if (!regexEmail.test(form.email.trim())) {
        errors.email = "El formato ingresado no es válido";
    } else if (emailExists) {
        errors.email = "El correo ingresado está en uso. Ingrese uno nuevo.";
    }

    if (!form.password.trim()) {
        errors.password = "El campo 'contraseña' es obligatorio";
    } else if (!regexPassword.test(form.password.trim())) {
        errors.password = "La contraseña debe contener 8 caracteres como mínimo, una letra mayúscula, una letra minúscula y un número";
    }

    if (form.idRol !== 2 && form.idRol !== 3) {
        errors.idRol = "Debes elegir algún rol";
    }

    return errors;
}

const Register = () => {
    // se obtienen los valores del formulario del hook personalizado para luego mostrar errores en caso de ser necesario
    const {
        form,
        handleChange,
        resetForm,
        handleRoleChange,
    } = useForm(initialForm, validationsForm);

    // variables que irán al formulario
    const name = form.name;
    const email = form.email;
    const password = form.password;
    const idRol = form.idRol;
    const [errors, setErrors] = useState({});

    // variables para manejar los modales
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const [isOpenModalFallido, openModalFallido, closeModalFallido] = useModal(false);

    // constantes para utilizar navigate y generar obtener un token en caso de que el usuario esté registrado
    const navigate = useNavigate();
    const { getToken } = AuthUser();

    // url a la que se le pasarán los parámetros y se realizará la petición asincrónica
    const endpoint = "http://localhost:8000/api/auth/register";

    useEffect(() => {
        if (getToken()) {
            navigate('/');
        }
    }, []);

    const checkEmailExists = async (email) => {
        let response = false;
        await axios.post('http://localhost:8000/api/auth/check-email', { email }).then(({ data }) => {
            if (data.exists) {
                response = true;
            }
        });
        return response;
    }

    const submitRegistro = async (e) => {
        e.preventDefault();

        // Actualiza los errores antes de proceder
        const emailExists = await checkEmailExists(email);
        const validationErrors = validationsForm(form, emailExists);
        setErrors(validationErrors);

        // Solo procede con el envío si no hay errores y se ha seleccionado un rol válido
        if (Object.keys(validationErrors).length === 0) {
            await axios.post(endpoint, { name, email, password, idRol }).then(({ data }) => {
                if (data.success) {
                    resetForm();
                    openModal();
                } else {
                    openModalFallido();
                }
            });
        }
    }


    return (
        <div className="flex-grow w-96 mx-auto">
            <div className="px-2 max-w-[66rem]">
                <div className="mt-7 bg-gray-100 border border-gray-200 rounded-3xl dark:bg-neutral-800 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    <div className="p-4 sm:p-7">

                        {/* Cabecera */}
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Registro</h1>
                            <div className="flex justify-center gap-2 mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                <div>¿Ya posees una cuenta?</div>
                                <a className="text-lime-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-lime-500" href="/login">
                                    Inicia Sesión Aquí
                                </a>
                            </div>
                        </div>
                        {/* Cabecera */}

                        {/* Formulario */}
                        <form className="mt-5">
                            <div className="grid gap-y-4">
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-4 dark:text-white">Nombre</label>
                                    <div className="relative">
                                        <input type="text" value={form.name} onChange={handleChange} name="name" className="py-2 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" aria-describedby="email-error" placeholder="Ingrese su nombre" required />
                                    </div>
                                </div>
                                {errors.name &&
                                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                                        <span >{errors.name}</span>
                                    </div>
                                }
                                {/* Nombre */}

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-4 dark:text-white">Correo electrónico</label>
                                    <div className="relative">
                                        <input type="email" value={form.email} onChange={handleChange} name="email" className="py-2 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" aria-describedby="email-error" placeholder="Ingrese su correo electrónico" required />
                                    </div>
                                </div>
                                {errors.email &&
                                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                                        <span >{errors.email}</span>
                                    </div>
                                }
                                {/* Email */}

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm mb-4 dark:text-white">Contraseña</label>
                                    <div className="relative">
                                        <input type="password" value={form.password} onChange={handleChange} name="password" className="py-2 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" aria-describedby="password-error" placeholder="Ingrese su contraseña" required />
                                    </div>
                                </div>
                                {errors.password &&
                                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                                        <span >{errors.password}</span>
                                    </div>
                                }
                                {/* Password */}

                                {/* Rol */}
                                <div className="border-t border-gray-300 dark:border-neutral-600">
                                    <label htmlFor="password" className="mt-3 block text-sm mb-4 dark:text-white">¿Qué tipo de cuenta quieres crear?</label>
                                    <ul className="grid w-full gap-6 grid-cols-2">
                                        <li>
                                            <input type="radio" id="cliente" name="idRol" value="2" className="hidden peer"
                                                onChange={() => handleRoleChange(2)}
                                                checked={form.idRol === 2}
                                                required />
                                            <label htmlFor="cliente" className="inline-flex items-center justify-between w-full p-5 rounded-2xl cursor-pointer border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50  dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Cliente</div>
                                                    <div className="w-full">Para contratar turnos</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="gestorComplejo" name="idRol" value="3" className="hidden peer"
                                                onChange={() => handleRoleChange(3)}
                                                checked={form.idRol === 3} />
                                            <label htmlFor="gestorComplejo" className="inline-flex items-center justify-between w-full p-5 rounded-2xl cursor-pointer border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50  dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Complejo</div>
                                                    <div className="w-full">Para gestionar mis turnos</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                {errors.idRol &&
                                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                                        <span >{errors.idRol}</span>
                                    </div>
                                }
                                {/* Rol */}

                                <button onClick={submitRegistro} className="w-full py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">Registrarse</button>
                            </div>
                        </form>
                        {/* Formulario */}

                    </div>
                </div>
            </div>

            {/* modal exitoso */}
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <button className="absolute top-0 right-0" onClick={closeModal}>
                    <X className="size-7 dark:text-white" />
                </button>
                <div className="flex flex-col items-center p-6">
                    <CircleCheck className="size-16 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center dark:text-white">Usuario creado exitosamente!</h3>
                <button onClick={() => navigate('/login')} className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                    Ir a Login
                </button>
            </Modal>

            {/* modal fallido */}
            <Modal isOpen={isOpenModalFallido} closeModal={closeModalFallido}>
                <button className="absolute top-0 right-0" onClick={closeModal}>
                    <X className="size-7 dark:text-white" />
                </button>
                <div className="flex justify-center p-6">
                    <CircleAlert className="size-16 text-red-600" />
                </div>
                <div className="text-lg font-semibold text-center dark:text-white">
                    No se pudo crear el usuario. Intente más tarde
                </div>
                <button onClick={closeModalFallido} className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                    Cerrar
                </button>
            </Modal>
        </div>
    )
}

export default Register;