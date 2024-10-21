import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthUser from "../pageauth/AuthUser";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal/Modal";
import { CircleAlert } from 'lucide-react';

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
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 h-24 rounded-3xl w-full flex items-center justify-center border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">PANEL DE ADMINISTRADOR</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}

            <div className="flex flex-col mx-auto max-w-[66rem] w-full px-2 mt-4">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700">
                    <div className="w-full flex mx-auto max-w-[66rem] px-4 flex-row mt-4 gap-4 items-center">
                        {/* Desplegable */}
                        <div className="basis-1/2 max-w-sm mx-auto">
                            <div className="flex flex-col gap-y-4">
                                <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un filtro:</label>
                                <select id="roles" onChange={handleFilterChange} name="roles" className="bg-gray-50 text-gray-900 text-sm focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:focus:ring-neutral-500 dark:focus:border-neutral-500 dark:bg-neutral-800 dark:placeholder-gray-400 dark:text-white border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70 rounded-2xl">
                                    <option value="">Todos los usuarios</option>
                                    <option value="1">Administradores</option>
                                    <option value="2">Clientes</option>
                                    <option value="3">Gestores de Complejos</option>
                                </select>
                            </div>
                        </div>
                        {/* Desplegable */}
                        {/* Radio */}
                        <div className="basis-1/2 flex flex-col gap-y-4">
                            <div className="flex items-center ps-4 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70 rounded-2xl">
                                <input checked={dadoDeBaja === true}
                                    onChange={handleFilterChange2}
                                    id="bordered-radio-1"
                                    type="radio"
                                    value="true"
                                    name="bordered-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuarios dados de baja</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70 rounded-2xl">
                                <input checked={dadoDeBaja === false}
                                    onChange={handleFilterChange2}
                                    id="bordered-radio-2" type="radio" value="false" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuarios activos</label>
                            </div>
                        </div>
                        {/* Radio */}
                    </div>

                    {/* Tabla */}
                    <div className="flex mx-auto max-w-[66rem] px-4 w-full mt-4">
                        <div className="flex flex-col w-full shadow-md dark:shadow-neutral-700/70 rounded-2xl">
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden border border-gray-200 dark:border-neutral-700 rounded-2xl">
                                        <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-neutral-700">
                                            <thead className="bg-gray-50 dark:bg-neutral-700">
                                                <tr>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Id Usuario</th>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Nombre Usuario</th>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Email</th>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Rol</th>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">¿Dado de Baja?</th>
                                                    <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                {filtrarPorRol(filtroRol).map(user => (
                                                    <tr key={user.id}>
                                                        <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200 whitespace-nowrap">{user.id}</td>
                                                        <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200 truncate">{user.name}</td>
                                                        <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200 truncate">{user.email}</td>
                                                        {user.idRol === 1 && <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">Administrador</td>}
                                                        {user.idRol === 2 && <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">Cliente</td>}
                                                        {user.idRol === 3 && <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">Gestor de Complejo</td>}
                                                        {user.bajaUsuario === null && <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">No</td>}
                                                        {user.bajaUsuario !== null && <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">{user.bajaUsuario}</td>}
                                                        <td className="px-2 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                            {user.bajaUsuario !== null
                                                                ? <button onClick={() => openModalAlta1(user.id)} className="mx-auto flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900">
                                                                    Dar de Alta
                                                                </button>
                                                                : <button onClick={() => openModalBaja1(user.id)} className="mx-auto flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                                    Dar de Baja
                                                                </button>
                                                            }
                                                        </td>
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
                            <CircleAlert className="size-16 text-red-600" />
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
                            <CircleAlert className="size-16 text-green-600" />
                        </div>
                        <h3 className="mb-4 text-lg font-semibold text-center">¿Estás seguro que deseas dar de alta al usuario?</h3>
                        <button onClick={cambiarEstadoUsuario} className="bg-green-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-green-600">
                            Si, estoy seguro
                        </button>
                        <button onClick={closeModalAlta1} className="text-gray-500 ml-5 bg-white hover:bg-gray-200 focus:ring-4 transition-colors duration-300 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center">
                            Cancelar
                        </button>
                    </Modal>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Panel;