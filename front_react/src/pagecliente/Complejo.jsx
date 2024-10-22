import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'
import { Star, CircleChevronLeft } from 'lucide-react'

const Complejo = () => {
    const { id } = useParams();
    const { getToken, getUser } = AuthUser();
    const navigate = useNavigate();

    const [complejo, setComplejo] = useState([]);
    const [complejoServicios, setComplejoServicios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [resenias, setResenias] = useState([]);
    const [canchasComplejo, setCanchasComplejo] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [diasDisponiblesComplejo, setDiasDisponiblesComplejo] = useState([]);
    const [favoritosComplejo, setFavoritosComplejo] = useState([]);

    const [loading, setLoading] = useState(true);

    const idUsuario = getUser().id;
    const idComplejo = id;
    const [cliente, setCliente] = useState([]);

    useEffect(() => {
        const obtenerInfoComplejo = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/cliente/complejo/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
            });

            // Guardar los datos del complejo
            setComplejo(respuesta.data.complejo);
            setComplejoServicios(respuesta.data.complejoServicios);
            setServicios(respuesta.data.servicios);
            setResenias(respuesta.data.resenias);
            setCanchasComplejo(respuesta.data.canchasComplejo);
            setDeportes(respuesta.data.deportes);
            setDiasDisponiblesComplejo(respuesta.data.diasComplejo);
            setFavoritosComplejo(respuesta.data.favoritosComplejo);
            setLoading(false);
        };

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
        obtenerInfoComplejo();
        obtenerCliente();
    }, []);

    if (loading) {
        return (<Loading />);
    }

    const idCliente = cliente.id;

    const agregarFavorito = async () => {
        await axios.post(`http://localhost:8000/api/cliente/agregarFavorito`, { idUsuario, idComplejo }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("agregado a favoritos exitosamente");
                const nuevoFavorito = {
                    idCliente: cliente.id,
                    idComplejo: idComplejo,
                    created_at: new Date().toISOString(), // Fecha actual
                    updated_at: new Date().toISOString() // Fecha actual
                }
                setFavoritosComplejo((prevFavoritos) => [...prevFavoritos, nuevoFavorito]);
                //window.location.reload();
            } else {
                console.log(data.error);
            }
        });
    }

    const eliminarFavorito = async () => {
        await axios.post(`http://localhost:8000/api/cliente/eliminarFavorito`, { idCliente, idComplejo }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("eliminado de favoritos exitosamente");
                const nuevosFavoritos = favoritosComplejo.filter(favorito =>
                    !(favorito.idCliente === idCliente && favorito.idComplejo === idComplejo)
                );
                setFavoritosComplejo(nuevosFavoritos);
                //window.location.reload();
            } else {
                console.log(data.error);
            }
        });
    }

    const esFavorito = favoritosComplejo.length > 0 && favoritosComplejo.some(favorito => favorito.idCliente === cliente.id);

    // Filtrar y mostrar los servicios del complejo
    const serviciosComplejo = complejoServicios.map((complejoServicio) => {
        const servicio = servicios.find(s => s.id === complejoServicio.idServicio);
        return servicio ? servicio.descripcionServicio : null;
    }).filter(Boolean);

    const obtenerDeporte = (idDeporte) => {
        const deporteEncontrado = deportes.find(deporte => deporte.id === idDeporte);
        return deporteEncontrado ? `${deporteEncontrado.nombreDeporte} (${deporteEncontrado.tipoDeporte})` : 'Deporte no encontrado';
    };

    return (
        <div>
            <div className='flex-grow overflow-visible'>
                <div className="flex flex-col mx-auto max-w-[66rem] px-2">
                    <div className="relative flex flex-col w-full bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                        <img className="object-cover w-full h-[450px]" src="/cancha01.jpg" alt="cancha" />
                        <div className="absolute top-[300px] left-0 p-4 text-neutral-900 dark:text-neutral-200 text-3xl font-bold backdrop-blur-sm bg-white/30 rounded-r-full pr-8">
                            {complejo.nombreComplejo}
                        </div>
                        <div className="absolute top-[425px] left-0 h-[25px] bg-gray-100 dark:bg-neutral-800 rounded-t-3xl w-full"></div>
                        <div className="backdrop-blur-sm bg-gray-100/30 dark:bg-black/30 border border-neutral-400 dark:border-neutral-700 rounded-full absolute top-[385px] right-[50px] p-3">
                            {esFavorito ?
                                <button type='button' onClick={eliminarFavorito}>
                                    <Star size={52} className="text-yellow-500" fill="#EAB308" />
                                </button>
                                :
                                <button type='button' onClick={agregarFavorito}>
                                    <Star size={52} className="text-yellow-500" />
                                </button>
                            }
                        </div>
                        <a href="/cliente/verCanchas" className='backdrop-blur-sm bg-white-100/30 rounded-full absolute top-[20px] left-[20px]'>
                            <CircleChevronLeft size={52} className="text-neutral-800" />
                        </a>
                        <div className="h-[20px]"></div>
                        <div className="flex flex-row bg-gray-100 dark:bg-neutral-800 h-[65px]">
                            <div className="basis-1/4 flex justify-center items-center font-bold dark:text-white">Ciudad: {complejo.ciudad}</div>
                            <div className="basis-1/4 flex justify-center items-center font-bold dark:text-white">Calle: {complejo.ubicacion}</div>
                            <div className="basis-1/4 flex justify-center items-center font-bold dark:text-white">Servicios del Complejo: </div>
                            <div className="basis-1/4 flex justify-center items-center font-bold dark:text-white">
                                <ul>
                                    {serviciosComplejo.length > 0 ? (
                                        serviciosComplejo.map((servicio, index) => (
                                            <li key={index} className="text-lime-600">{servicio}</li>
                                        ))
                                    ) : (
                                        <p>No hay servicios disponibles para este complejo.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-row bg-gray-100 dark:bg-neutral-800"></div>
                        {/* Canchas del Complejo */}
                        <h2 className="text-2xl font-bold text-center my-4 dark:text-white">Canchas del Complejo</h2>
                        <div className="flex px-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                {canchasComplejo.length > 0 ? (
                                    canchasComplejo.map((cancha, index) => (
                                        <div
                                            key={index}
                                            onClick={() => navigate(`/cliente/cancha/${cancha.id}`)}
                                            className="flex flex-col bg-white rounded-xl dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
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
                                                    className="mt-4 py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                                    onClick={() => navigate(`/cliente/cancha/${cancha.id}`)}
                                                >
                                                    Sacar Turno
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='block text-sm mb-4 dark:text-white mt-4'>No hay canchas disponibles en este complejo.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Complejo