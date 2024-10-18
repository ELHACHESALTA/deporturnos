import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'
import { Star } from 'lucide-react'

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
                    'Authorization': 'Bearer '+ getToken()
                }
            }).then(({data})=> {
                if(data.success){
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
        }).then(({data})=> {
            if(data.success){
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
        }).then(({data})=> {
            if(data.success){
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
        {/* Mostrar la información del complejo */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
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
            <p><strong>Nombre del Complejo:</strong> {complejo.nombreComplejo}</p>
            <p><strong>Ciudad:</strong> {complejo.ciudad}</p>
            <p><strong>Calle:</strong> {complejo.ubicacion}</p>
            <h2>Servicios del Complejo:</h2>
            <ul>
                {serviciosComplejo.length > 0 ? (
                    serviciosComplejo.map((servicio, index) => (
                        <li key={index} className="text-green-600">{servicio}</li>
                    ))
                ) : (
                    <p>No hay servicios disponibles para este complejo.</p>
                )}
            </ul>
            <h2>Canchas del complejo:</h2>
            <div className="flex flex-wrap justify-start gap-4">
                {canchasComplejo.length > 0 ? (
                    canchasComplejo.map((cancha, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/cliente/cancha/${cancha.id}`)}
                            className="cursor-pointer p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition duration-300 ease-in-out w-full sm:w-1/2 lg:w-1/3"
                        >
                            <h3 className="text-lg font-semibold text-green-600">{cancha.nombreCancha}</h3>
                            <p className="text-gray-600">
                                <strong>Deporte:</strong> {obtenerDeporte(cancha.idDeporte)}
                            </p>
                            <p className="text-gray-600">
                                <strong>ID de la Cancha:</strong> {cancha.id}
                            </p>
                            <p className="text-gray-600">
                                <strong>ID del Complejo:</strong> {cancha.idComplejo}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No hay canchas disponibles en este complejo.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Complejo