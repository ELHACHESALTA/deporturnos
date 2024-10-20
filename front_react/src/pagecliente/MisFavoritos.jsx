import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios'
import Loading from '../components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'

const MisFavoritos = () => {
    const { getToken, getUser } = AuthUser();
    const navigate = useNavigate();
    const [favoritos, setFavoritos] = useState([]);
    const [complejosFavoritos, setComplejosFavoritos] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [loading, setLoading] = useState(true);

    const idUsuario = getUser().id;

    const obtenerCliente = async () => {
        await axios.post('http://localhost:8000/api/cliente/obtenerCliente', { idUsuario }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                setCliente(data.cliente);
            }
        });
    }

    const obtenerMisFavoritos = async () => {
        await axios.post('http://localhost:8000/api/cliente/obtenerMisFavoritos', { idUsuario }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                setFavoritos(data.favoritosCliente);
                setComplejosFavoritos(data.complejosFavoritos);
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        obtenerCliente();
        obtenerMisFavoritos();
    }, [])

    if (loading) {
        return (<Loading />);
    }

    const eliminarFavorito = async (idCliente, idComplejo) => {
        await axios.post(`http://localhost:8000/api/cliente/eliminarFavorito`, { idCliente, idComplejo }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("eliminado de favoritos exitosamente");
                window.location.reload();
            } else {
                console.log(data.error);
            }
        });
    }

    return (
        <div className="flex-grow">
            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 py-4 rounded-xl w-full max-w-full">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">COMPLEJOS FAVORITOS</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {complejosFavoritos.map(complejo => (
                        <div key={complejo.id} className="flex flex-col border shadow-sm rounded-xl bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70" >
                            <img className="object-cover w-full h-[200px] rounded-t-xl" src="/cancha01.jpg" alt="cancha" />
                            <div className="relative">
                                <div className="absolute top-[-16px] left-0 h-[16px] bg-gray-100 dark:bg-neutral-800 rounded-t-3xl w-full"></div>
                                <div className="backdrop-blur-sm bg-gray-100/30 dark:bg-black/30 border border-neutral-400 dark:border-neutral-700 rounded-full absolute top-[-54px] left-[30px] p-3">
                                    <button type='button' onClick={() => eliminarFavorito(cliente.id, complejo.id)}>
                                        <Star size={52} className="text-yellow-500" fill="#EAB308" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 pb-4 pt-8">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    {complejo.nombreComplejo}
                                </h3>
                                <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                    Ciudad: {complejo.ciudad}
                                </p>
                                <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                    Ubicación: {complejo.ubicacion}
                                </p>
                                <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                    Creado: {new Date(complejo.created_at).toLocaleString()}
                                </p>
                                <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                    Actualizado: {new Date(complejo.updated_at).toLocaleString()}
                                </p>
                                <button type='button' onClick={() => navigate(`/cliente/complejo/${complejo.id}`)}
                                    className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-300 mt-4">
                                    Ir al complejo
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* {canchasComplejo.length > 0 ? (
                        canchasComplejo.map((cancha, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/cliente/cancha/${cancha.id}`)}
                                className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                <img className="object-cover w-full h-[200px] rounded-t-xl" src="/cancha01.jpg" alt="cancha" />
                                <div className="p-4 md:p-5">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                        {cancha.nombreCancha}
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                        Deporte: {obtenerDeporte(cancha.idDeporte)}
                                    </p>
                                    <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                        ID de la Cancha: {cancha.id}
                                    </p>
                                    <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                        ID del Complejo: {cancha.idComplejo}
                                    </p>

                                    <button
                                        className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-300 mt-4"
                                        onClick={() => navigate(`/cliente/cancha/${cancha.id}`)}
                                    >
                                        Sacar Turno
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='block text-sm mb-4 dark:text-white mt-4'>No hay canchas disponibles en este complejo.</p>
                    )} */}
                </div>
            </div>
        </div >
    )
}

export default MisFavoritos