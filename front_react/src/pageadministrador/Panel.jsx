import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthUser from "../pageauth/AuthUser";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal/Modal";

const Panel = () => {
    // Estado para controlar los filtros por roles y por dados de baja o no
    const [filtroRol, setFiltroRol] = useState(0);
    const [dadoDeBaja, setDadoDeBaja] = useState(false);

    // Estado para controlar la visibilidad del modal
    const [currentUserId, setCurrentUserId] = useState(null);

    // nuevo
    const [isOpenModalBaja, openModalBaja, closeModalBaja] = useModal(false);
    const [isOpenModalAlta, openModalAlta, closeModalAlta] = useModal(false);

    const [users, setUsers] = useState([]);
    const { getToken } = AuthUser();
    const endpoint = "http://localhost:8000/api/admin/users";

    // Funciones para abrir y cerrar el modal de baja
    const openModalBaja1 = (id) => {
        setCurrentUserId(id);
        openModalBaja();
    };

    const closeModalBaja1 = () => {
        closeModalBaja();
        setCurrentUserId(null);
    };


    // Funciones para abrir y cerrar el modal de alta
    const openModalAlta1 = (id) => {
        setCurrentUserId(id);
        openModalAlta();
    };

    const closeModalAlta1 = () => {
        closeModalAlta();
        setCurrentUserId(null);
    };


    // Función para cambiar el estado del usuario
    const cambiarEstadoUsuario = async () => {
        if (currentUserId) {
            await axios.put(`http://localhost:8000/api/admin/cambioEstadoUsuario/${currentUserId}`, { id: currentUserId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
            }).then(({ data }) => {
                if (data.success) {
                    getAllUsers(); // Actualiza la lista de usuarios
                    closeModalBaja1(); // Cierra el modal de baja
                    closeModalAlta1(); // Cierra el modal de alta
                }
            });
        }
    };

    // Función para obtener todos los usuarios del sistema
    const getAllUsers = async () => {
        const respuesta = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        setUsers(respuesta.data);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    //Función para filtrar según el rol elegido
    const filtrarPorRol = (rol) => {

        let arregloFiltrado = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].idRol === rol) {
                arregloFiltrado.push(users[i]);
            }
        }
        if (arregloFiltrado.length < 1) {
            arregloFiltrado = users;
        }

        const arregloFinal = filtrarPorDadoDeBaja(dadoDeBaja, arregloFiltrado);
        return arregloFinal;
    }

    // Función para filtrar por usuarios que estén dados de baja o no
    const filtrarPorDadoDeBaja = (dadoDeBaja, arreglo) => {
        let arregloFiltrado = [];
        for (let i = 0; i < arreglo.length; i++) {
            if (dadoDeBaja && arreglo[i].bajaUsuario !== null) {
                arregloFiltrado.push(arreglo[i]);
            } else if (!dadoDeBaja && arreglo[i].bajaUsuario === null) {
                arregloFiltrado.push(arreglo[i]);
            }
        }
        return arregloFiltrado;
    }

    // Función para manejar el cambio en el <select>
    const handleFilterChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        setFiltroRol(selectedValue);
    };

    const handleFilterChange2 = (event) => {
        const value = event.target.value === 'true';
        setDadoDeBaja(value);
    }

    return (
        <div className="flex-grow">

            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 py-4 rounded-xl w-full max-w-full">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">PANEL DE ADMINISTRADOR</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}

            <div className="w-full flex mx-auto max-w-[66rem] px-2 flex-row mt-4 gap-4 items-center">
                {/* Desplegable */}
                <div className="basis-1/2 max-w-sm mx-auto">
                    <div className="flex flex-col">
                        <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un filtro</label>
                        <select id="roles" onChange={handleFilterChange} name="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:focus:ring-neutral-500 dark:focus:border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white">
                            <option value="">Todos los usuarios</option>
                            <option value="1">Administradores</option>
                            <option value="2">Clientes</option>
                            <option value="3">Gestores de Complejos</option>
                        </select>
                    </div>
                </div>
                {/* Desplegable */}
                {/* Radio */}
                <div className="basis-1/2">
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input checked={dadoDeBaja === true}
                            onChange={handleFilterChange2}
                            id="bordered-radio-1"
                            type="radio"
                            value="true"
                            name="bordered-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuarios dados de baja</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input checked={dadoDeBaja === false}
                            onChange={handleFilterChange2}
                            id="bordered-radio-2" type="radio" value="false" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuarios activos</label>
                    </div>
                </div>
                {/* Radio */}
            </div>

            {/* Tabla */}
            <div className="flex mx-auto max-w-[66rem] px-2 w-full mt-4">
                <div className="flex flex-col mx-auto">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead className="bg-gray-50 dark:bg-neutral-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Id Usuario</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Nombre Usuario</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Email</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Rol</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">¿Dado de Baja?</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">

                                        {filtrarPorRol(filtroRol).map(user => (
                                            <tr className="" key={user.id}>
                                                <th scope="row" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.id}</th>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.email}</td>
                                                {user.idRol === 1 && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Administrador</td>}
                                                {user.idRol === 2 && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Cliente</td>}
                                                {user.idRol === 3 && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Gestor de Complejo</td>}
                                                {user.bajaUsuario === null && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">No</td>}
                                                {user.bajaUsuario !== null && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.bajaUsuario}</td>}
                                                {user.bajaUsuario !== null
                                                    && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 max-w-[12rem] truncate">
                                                        <button
                                                            type="button"
                                                            onClick={() => openModalAlta1(user.id)}
                                                            className="flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                                                            </svg>
                                                            Dar de Alta
                                                        </button>
                                                    </td>
                                                }
                                                {user.bajaUsuario === null
                                                    && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 max-w-[12rem] truncate">
                                                        <button
                                                            type="button"
                                                            onClick={() => openModalBaja1(user.id)}
                                                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            Dar de Baja
                                                        </button>
                                                    </td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table */}

            {/* modal para confirmacion de dar de baja */}
            <Modal isOpen={isOpenModalBaja} closeModal={closeModalBaja}>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>

                </div>
                <h3 className="mb-4 text-lg font-semibold text-center">¿Estás seguro que deseas dar de baja al usuario?</h3>
                <button onClick={cambiarEstadoUsuario} className="bg-red-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-red-600">
                    Si, estoy seguro
                </button>
                <button onClick={closeModalBaja1} className="text-gray-500 ml-5 bg-white hover:bg-gray-100 focus:ring-4 transition-colors duration-300 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center">
                    Cancelar
                </button>
            </Modal>

            {/* modal para confirmacion de dar de alta */}
            <Modal isOpen={isOpenModalAlta} closeModal={closeModalAlta}>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h3 className="mb-4 text-lg font-semibold text-center">¿Estás seguro que deseas dar de alta al usuario?</h3>
                <button onClick={cambiarEstadoUsuario} className="bg-green-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-green-600">
                    Si, estoy seguro
                </button>
                <button onClick={closeModalAlta1} className="text-gray-500 ml-5 bg-white hover:bg-gray-200 focus:ring-4 transition-colors duration-300 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center">
                    Cancelar
                </button>
            </Modal>
        </div>
    );
};

export default Panel;