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
        <div className='flex-grow'>

            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 py-4 rounded-xl w-full max-w-full">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">VER CANCHAS</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}

            {/* Búsqueda y filtros */}
            <div className="flex mx-auto max-w-[66rem] px-2 mt-4">
                <div className="flex flex-col mx-auto w-full">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
                        <form className="">
                            {/* Buscador por nombre de complejo */}
                            <div className="relative mb-4 w-full flex items-center justify-between rounded-md">
                                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8" className=""></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                                </svg>
                                <input
                                    type="search"
                                    id="default-search"
                                    value={valorBuscador}
                                    onChange={(e) => setValorBuscador(e.target.value)}
                                    className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-4 pl-9 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                    placeholder="Buscar por nombre de complejo"
                                    required
                                />
                            </div>
                            {/* Buscador por nombre de complejo */}

                            {/* Filtros */}
                            <label for="date" className="text-lg flex justify-center rounded-md w-full bg-neutral-200 font-medium text-stone-600 mb-4 dark:bg-neutral-500 dark:text-white">Filtros</label>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {/* Filtro por deporte */}
                                <div className="flex flex-col items-center justify-center">
                                    <select
                                        value={deporteFiltro}
                                        onChange={(e) => setDeporteFiltro(e.target.value)}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                    >
                                        <option value="">Por deporte</option>
                                        {deportes.map((deporte) => (
                                            <option key={deporte.id} value={`${deporte.nombreDeporte} ${deporte.tipoDeporte}`}>
                                                {`${deporte.nombreDeporte} ${deporte.tipoDeporte}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Filtro por deporte */}

                                {/* Filtro por ciudad */}
                                <div className="flex flex-col items-center justify-center">
                                    <select
                                        value={ciudadFiltro}
                                        onChange={(e) => setCiudadFiltro(e.target.value)}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                    >
                                        <option value="">Por ciudad</option>
                                        {ciudadesUnicas.map((ciudad, index) => (
                                            <option key={index} value={ciudad}>
                                                {ciudad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Filtro por ciudad */}

                                <div className="flex flex-col items-end justify-center">
                                    <label for="date" className="text-sm font-medium text-stone-600 dark:text-white">Filtrar por servicios:</label>
                                </div>

                                <div className="flex flex-col items-start justify-center dark:text-white">
                                    {/* Filtro por servicios */}
                                    <div className="flex flex-col justify-center">
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
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                                {/* Filtro por día turno */}
                                <div className="flex flex-col items-center justify-center">
                                    <label for="name" className="text-sm font-medium text-stone-600 dark:text-white">Por fecha turno:</label>
                                    <input type="date" id="date" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" />
                                </div>
                                {/* Filtro por día turno */}

                                {/* Filtro por hora inicio turno */}
                                <div className="flex flex-col items-center justify-center">
                                    <label for="name" className="text-sm font-medium text-stone-600 dark:text-white">Por hora inicio turno:</label>
                                    <input type="time" id="time" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" min="09:00" max="18:00" value="00:00" required />
                                </div>
                                {/* Filtro por hora inicio turno */}
                            </div>
                            {/* Filtros */}
                        </form>
                    </div>
                </div>
            </div>
            {/* Búsqueda y filtros */}

            {/* Canchas disponibles */}
            <h2 className="text-2xl font-bold text-center my-4 dark:text-white">Canchas Disponibles Encontradas</h2>
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {canchasFiltradas.length > 0 ? (
                        canchasFiltradas.map((cancha) => {
                            const complejoFinal = getComplejo(cancha.idComplejo);
                            const deporteFinal = getDeporte(cancha.idDeporte);
                            const serviciosFinal = getServiciosComplejo(cancha.idComplejo);

                            return (
                                <div key={cancha.id} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                    <img className="h-[200px] rounded-t-xl" src="/cancha01.jpg" alt="cancha" />
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                            {cancha.nombreCancha}
                                        </h3>
                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                            Complejo: {complejoFinal?.nombreComplejo}
                                        </p>
                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                            Ciudad: {complejoFinal?.ciudad}
                                        </p>
                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                            Calle: {complejoFinal?.ubicacion}
                                        </p>
                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                            Deporte: {deporteFinal?.nombreDeporte}
                                        </p>
                                        <p className="mt-1 text-gray-500 dark:text-neutral-400 font-bold">
                                            Servicios: {serviciosFinal.map(servicio => servicio.descripcionServicio).join(', ') || 'Ninguno'}
                                        </p>

                                        <button className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-300 mt-4">
                                            Sacar Turno
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className='block text-sm mb-4 dark:text-white mt-4'>No se encontraron canchas.</p>
                    )}
                </div>
            </div>
            {/* Canchas disponibles */}

        </div>
    );
};

export default VerCanchas;
