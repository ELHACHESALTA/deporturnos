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
    const {getUser, getToken} = AuthUser();
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
                'Authorization': 'Bearer '+ getToken()
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

    if (loading){
        return (<Loading/>)
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
        {complejo === null ? (
            <Modal isOpen={true}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <p className="text-gray-700 text-xl mb-6">
                        Primero debes crear un complejo para acceder a "Mis Canchas"!
                    </p>
                    <button
                        onClick={() => navigate('/gestorComplejo/miComplejo')}
                        className="bg-blue-500 text-white border-none px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Ir a Mi Complejo
                    </button>
                </div>
            </Modal>
        ) : 
        <div>
            <button onClick={openModalCreate} className="bg-green-500 text-white px-6 py-2 mb-4 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                Crear nueva cancha
            </button>
            {canchas.length > 0 ?
             canchas.map(cancha => (
                <div key={cancha.id} className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200 relative">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {cancha.nombreCancha}
                    </h3>
                    <p className="text-gray-600 mb-1">
                        <strong>Id:</strong> {cancha.id}
                    </p>
                    <p className="text-gray-600 mb-1">
                        <strong>Complejo:</strong> {cancha.idComplejo}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Deporte:</strong> {cancha.idDeporte}
                    </p>
                    <div className="absolute top-4 right-4">
                        <button onClick={() => openModalEdit1(cancha)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <button onClick={() => openModalDelete1(cancha.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => navigate('/gestorComplejo/misTurnos')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                            Ir a Mis Turnos
                        </button>
                    </div>
                </div>
            ))
            :
            <div>No hay canchas en este complejo</div> 
            }
        </div>
        }

        {/* modal para crear canchas */}
        <Modal isOpen={isOpenModalCreate} closeModal={closeModalCreate}>
            <CreateCancha closeModal={closeModalCreate}/>
        </Modal>

        {/* modal para editar canchas */}
        <EditCancha cancha={canchaAEditar} closeModal={closeModalEdit1} isOpen={isOpenModalEdit}/>

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
    </div>
  )
}

export default MisCanchas