import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { useModal } from '../hooks/useModal';
import CreateCancha from '../components/CreateCancha/CreateCancha';
import EditCancha from '../components/EditCancha/EditCancha';
import CreateTurno from '../components/CreateTurno/CreateTurno';

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

    const [isOpenModalTurno, openModalTurno, closeModalTurno] = useModal(false);

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
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <p className="block text-sm mb-4 dark:text-white mt-4">
                                    Primero debes crear un complejo para acceder a "Mis Canchas"!
                                </p>
                                <button
                                    onClick={() => navigate('/gestorComplejo/miComplejo')}
                                    className="bg-lime-500 text-white border-none px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                >
                                    Ir a Mi Complejo
                                </button>
                            </div>
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
                                                        <div className="absolute top-5 right-6 dark:text-white">
                                                            <button onClick={() => openModalEdit1(cancha)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="absolute bottom-6 right-6">
                                                            <button onClick={() => openModalDelete1(cancha.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button onClick={() => navigate('/gestorComplejo/misTurnos')} className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-300 mt-4">
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
                    <Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete1}>
                        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h3 className="mb-4 text-lg font-semibold text-center">¿Estás seguro que deseas dar de baja a la cancha?</h3>
                        <button onClick={cambiarEstadoCancha} className="bg-red-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-red-600">
                            Si, estoy seguro
                        </button>
                        <button onClick={closeModalDelete1} className="text-gray-500 ml-5 bg-white hover:bg-gray-100 focus:ring-4 transition-colors duration-300 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center">
                            Cancelar
                        </button>
                    </Modal>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    )
}

export default MisCanchas