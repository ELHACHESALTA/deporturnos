import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import CreateCancha from '../components/CreateCancha/CreateCancha';
import EditCancha from '../components/EditCancha/EditCancha';
import { CircleAlert, SquarePen, Trash2, X } from 'lucide-react';

const MisCanchas = () => {
    const { getUser, getToken } = AuthUser();
    const idUser = getUser().id;
    const [canchas, setCanchas] = useState([]);
    const [complejo, setComplejo] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [canchaAEditar, setCanchaAEditar] = useState([]);
    const [idCanchaAEliminar, setIdCanchaAEliminar] = useState(null);

    // variables para manejar el modal de creación de canchas
    const [isOpenModalCreate, openModalCreate, closeModalCreate] = useModal(false);
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);
    const [isOpenModalDelete, openModalDelete, closeModalDelete] = useModal(false);

    const openModalEdit1 = (cancha) => {
        setCanchaAEditar(cancha);
        openModalEdit();
    }

    const closeModalEdit1 = () => {
        setCanchaAEditar([]);
        closeModalEdit();
    }

    const openModalDelete1 = (id) => {
        setIdCanchaAEliminar(id);
        openModalDelete();
    }

    const closeModalDelete1 = () => {
        setIdCanchaAEliminar(null);
        closeModalDelete();
    }

    const obtenerCanchas = async (idUser) => {
        await axios.post(`http://localhost:8000/api/gestorComplejo/obtenerCanchas`, { idUser }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(response => {
            setCanchas(response.data.canchas);
            setComplejo(response.data.complejo);
            setLoading(false);
        })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        obtenerCanchas(idUser);
    }, []);

    if (loading) {
        return (<Loading />)
    }

    const cambiarEstadoCancha = async () => {
        if (idCanchaAEliminar) {
            const id = idCanchaAEliminar;
            await axios.put(`http://localhost:8000/api/gestorComplejo/cambiarEstadoCancha`, { id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
            }).then(({ data }) => {
                if (data.success) {
                    closeModalDelete1();
                    window.location.reload();
                }
            });
        }
    };

    return (
        <div className='flex-grow'>
            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 h-24 rounded-3xl w-full flex items-center justify-center border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">MIS CANCHAS</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}
            <div className="flex flex-col mx-auto max-w-[66rem] px-2 mt-4">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    {complejo === null ? (
                        <Modal isOpen={true}>
                            <div className="flex justify-center p-6">
                                <CircleAlert className="w-16 h-16 text-red-600" />
                            </div>
                            <p className="text-lg font-semibold text-center dark:text-white">
                                Primero debes crear un complejo para acceder a "Mis Canchas"
                            </p>
                            <button
                                onClick={() => navigate('/gestorComplejo/miComplejo')}
                                className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Ir a Mi Complejo
                            </button>
                        </Modal>
                    ) :
                        <div className="">
                            <div className="flex mx-auto max-w-[66rem] px-4">
                                <div className="w-full">
                                    <button onClick={openModalCreate} className="px-6 py-2 mb-4 mt-4 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700">
                                        Crear nueva cancha
                                    </button>
                                </div>
                            </div>
                            <div className="flex mx-auto max-w-[66rem] px-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    {canchas.length > 0 ? (
                                        canchas.map(cancha => (
                                            <div key={cancha.id} className="flex flex-col bg-white rounded-xl dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                                                <img className="object-cover w-full h-[200px] rounded-t-xl" src="/cancha01.jpg" alt="cancha" />
                                                <div className="relative">
                                                    <div className="p-4 md:p-5">
                                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                            {cancha.nombreCancha}
                                                        </h3>
                                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                                            Id: {cancha.id}
                                                        </p>
                                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                                            Complejo: {cancha.idComplejo}
                                                        </p>
                                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                                            Deporte: {cancha.idDeporte}
                                                        </p>
                                                        <div className="absolute top-6 right-6 dark:text-white">
                                                            <button onClick={() => openModalEdit1(cancha)}>
                                                                <SquarePen />
                                                            </button>
                                                        </div>
                                                        <div className="absolute bottom-6 right-6">
                                                            <button onClick={() => openModalDelete1(cancha.id)}>
                                                                <Trash2 className="w-6 h-6 text-red-600" />
                                                            </button>
                                                        </div>
                                                        <button onClick={() => navigate('/gestorComplejo/misTurnos')} className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                                                            Ir a Mis Turnos
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="block text-sm mb-4 dark:text-white mt-4">No hay canchas en este complejo</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                    {/* modal para crear canchas */}
                    <Modal isOpen={isOpenModalCreate} closeModal={closeModalCreate}>
                        <CreateCancha closeModal={closeModalCreate} />
                    </Modal>
                    {/* modal para editar canchas */}
                    <EditCancha cancha={canchaAEditar} closeModal={closeModalEdit1} isOpen={isOpenModalEdit} />
                    {/* modal para la confirmación de dar de baja canchas */}
                    <Modal isOpen={isOpenModalDelete}>
                        <button className="absolute top-0 right-0" onClick={closeModalDelete1}>
                            <X className="size-7 dark:text-white" />
                        </button>
                        <div className="flex justify-center p-6">
                            <CircleAlert className="w-16 h-16 text-red-600" />
                        </div>
                        <div className="text-lg font-semibold text-center dark:text-white">
                            ¿Estás seguro que deseas dar de baja a la cancha?
                        </div>
                        <button onClick={cambiarEstadoCancha} className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                            Si, estoy seguro
                        </button>
                    </Modal>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    )
}

export default MisCanchas