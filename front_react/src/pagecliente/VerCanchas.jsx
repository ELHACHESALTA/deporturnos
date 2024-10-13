import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthUser from '../pageauth/AuthUser';
import Loading from '../components/Loading/Loading';

const VerCanchas = () => {
    const { getToken } = AuthUser();
    const [canchas, setCanchas] = useState([]);
    const [complejos, setComplejos] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [complejoServicios, setComplejoServicios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [valorBuscador, setValorBuscador] = useState('');
    const [deporteFiltro, setDeporteFiltro] = useState('');
    const [ciudadFiltro, setCiudadFiltro] = useState('');
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    const [canchasFiltradas, setCanchasFiltradas] = useState([]);

    const obtenerCanchas = async () => {
        const respuesta = await axios.get('http://localhost:8000/api/cliente/verCanchas', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        setCanchas(respuesta.data.canchas);
        setComplejos(respuesta.data.complejos);
        setDeportes(respuesta.data.deportes);
        setServicios(respuesta.data.servicios);
        setComplejoServicios(respuesta.data.complejoServicios);
        setCanchasFiltradas(respuesta.data.canchas);
        setLoading(false);
    };

    useEffect(() => {
        obtenerCanchas();
    }, []);

    const getComplejo = (idComplejo) => complejos.find(complejo => complejo.id === idComplejo);
    const getDeporte = (idDeporte) => deportes.find(deporte => deporte.id === idDeporte);
    const getServiciosComplejo = (idComplejo) => {
        const serviciosIds = complejoServicios
            .filter(cs => cs.idComplejo === idComplejo)
            .map(cs => cs.idServicio);
        return servicios.filter(servicio => serviciosIds.includes(servicio.id));
    };

    // Filtrar canchas cuando cambian los filtros
    useEffect(() => {
        const filtrarCanchas = () => {
            const result = canchas.filter(cancha => {
                const complejo = getComplejo(cancha.idComplejo);
                const deporte = getDeporte(cancha.idDeporte);
                const serviciosComplejo = getServiciosComplejo(cancha.idComplejo);
                
                const matchesNombre = complejo?.nombreComplejo.toLowerCase().includes(valorBuscador.toLowerCase());
                const matchesDeporte = deporteFiltro === '' || `${deporte?.nombreDeporte} ${deporte?.tipoDeporte}` === deporteFiltro;
                const matchesCiudad = ciudadFiltro === '' || complejo?.ciudad === ciudadFiltro;
                const matchesServicios = serviciosSeleccionados.length === 0 || serviciosSeleccionados.every(servicioId => serviciosComplejo.some(servicio => servicio.id === servicioId));
                return matchesNombre && matchesDeporte && matchesCiudad && matchesServicios;
            });
            setCanchasFiltradas(result);
        };
        filtrarCanchas();
    }, [valorBuscador, deporteFiltro, ciudadFiltro, serviciosSeleccionados, canchas]);

    if (loading) {
        return (<Loading />);
    }

    const ciudadesUnicas = Array.from(new Set(complejos.map(complejo => complejo.ciudad)));

    // Manejar cambio en los checkboxes de servicios
    const handleServicioChange = (e) => {
        //const servicioId = e.target.value;
        const servicioId = parseInt(e.target.value, 10);
        if (serviciosSeleccionados.includes(servicioId)) {
            setServiciosSeleccionados(serviciosSeleccionados.filter(id => id !== servicioId)); // Eliminar el servicio
        } else {
            setServiciosSeleccionados([...serviciosSeleccionados, servicioId]); // Agregar el servicio
        }
    };

    return (
        <div className='flex-grow text-black'>
            {/* Buscador por nombre de complejo */}
            <div className="max-w-md mx-auto">
                <label htmlFor='default-search' className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        value={valorBuscador} 
                        onChange={(e) => setValorBuscador(e.target.value)} 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Buscar por nombre de complejos..." 
                        required 
                    />
                </div>
            </div>
            {/* Fin de buscador por nombre de complejo */}

            {/* Filtros de deporte, ciudad y servicios */}
            <div className="flex flex-col mt-4">
                <div className="flex justify-center">
                    {/* Filtro por deporte */}
                    <select
                        value={deporteFiltro}
                        onChange={(e) => setDeporteFiltro(e.target.value)}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mx-2"
                    >
                        <option value="">Todos los deportes</option>
                        {deportes.map((deporte) => (
                            <option key={deporte.id} value={`${deporte.nombreDeporte} ${deporte.tipoDeporte}`}>
                                {`${deporte.nombreDeporte} ${deporte.tipoDeporte}`}
                            </option>
                        ))}
                    </select>
                    {/* Fin de filtro por deporte */}

                    {/* Filtro por ciudad */}
                    <select
                        value={ciudadFiltro}
                        onChange={(e) => setCiudadFiltro(e.target.value)}
                        className="border p-2 rounded mx-2"
                    >
                        <option value="">Todas las ciudades</option>
                        {ciudadesUnicas.map((ciudad, index) => (
                            <option key={index} value={ciudad}>
                                {ciudad}
                            </option>
                        ))}
                    </select>
                    {/* Fin de filtro por ciudad */}
                </div>

                {/* Filtro por servicios */}
                <h3 className="text-lg font-semibold mt-4">Filtrar por servicios:</h3>
                <div className="flex flex-wrap justify-center">
                    {servicios.map((servicio) => (
                        <label key={servicio.id} className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                value={servicio.id}
                                checked={serviciosSeleccionados.includes(servicio.id)}
                                onChange={handleServicioChange}
                                className="mr-2"
                            />
                            {servicio.descripcionServicio}
                        </label>
                    ))}
                </div>
                {/* Fin de filtro por servicios */}
            </div>

            {/* Canchas disponibles */}
            <div className="max-w-lg mx-auto my-5 p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-center mb-4">Canchas Disponibles</h2>
                {canchasFiltradas.length > 0 ? (
                    canchasFiltradas.map((cancha) => {
                        const complejoFinal = getComplejo(cancha.idComplejo);
                        const deporteFinal = getDeporte(cancha.idDeporte);
                        const serviciosFinal = getServiciosComplejo(cancha.idComplejo);

                        return (
                            <div key={cancha.id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                                <h3 className="text-xl font-semibold"> {cancha.nombreCancha} </h3>
                                <p className="text-gray-700"><strong>Complejo:</strong> {complejoFinal?.nombreComplejo}</p>
                                <p className="text-gray-700"><strong>Ciudad:</strong> {complejoFinal?.ciudad}</p>
                                <p className="text-gray-700"><strong>Calle:</strong> {complejoFinal?.ubicacion}</p>
                                <p className="text-gray-700"><strong>Deporte:</strong> {deporteFinal?.nombreDeporte}</p>
                                <p className="text-gray-700"><strong>Servicios:</strong> {serviciosFinal.map(servicio => servicio.descripcionServicio).join(', ') || 'Ninguno'}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>No se encontraron canchas.</p>
                )}
            </div>
        </div>
    );
};

export default VerCanchas;
