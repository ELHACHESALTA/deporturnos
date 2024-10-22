import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'
import { Star, Dot, CircleChevronLeft } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import DatosCancha from '../components/DatosCancha/DatosCancha'
import DatosComplejo from '../components/DatosComplejo/DatosComplejo'
import Resenias from '../components/Resenias/Resenias'
import ReservarTurno from '../components/ReservarTurno/ReservarTurno'

// Inicio configuraciones de React Big Calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Inicio traducción al español
import 'moment/locale/es';

moment.locale('es');

const messages = {
    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Turno',
    allDay: 'Todo el día',
    noEventsInRange: 'No hay turnos en este rango.',
};
// Fin traducción al español

const localizer = momentLocalizer(moment);

const formats = {
    dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd D', culture),  // Muestra "Lunes 15"
    weekdayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd', culture),  // Muestra "Lunes"
    monthHeaderFormat: (date, culture, localizer) =>
        localizer.format(date, 'MMMM YYYY', culture),  // Muestra "Octubre 2024"
    timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, 'HH:mm', culture),  // Muestra las horas en formato 24h
};
// Fin configuraciones de React Big Calendar

const Cancha = () => {
    const { id } = useParams();
    const { getToken, getUser } = AuthUser();

    const [cancha, setCancha] = useState([]);
    const [complejo, setComplejo] = useState([]);
    const [deporte, setDeporte] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [complejoServicios, setComplejoServicios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [resenias, setResenias] = useState([]);
    const [canchasComplejo, setCanchasComplejo] = useState([]);
    const [diasDisponiblesComplejo, setDiasDisponiblesComplejo] = useState([]);
    const [favoritosComplejo, setFavoritosComplejo] = useState([]);

    const [loading, setLoading] = useState(true);

    const [turnosAMostrar, setTurnosAMostrar] = useState([]);
    const [turnoAReservar, setTurnoAReservar] = useState([]);


    // modal para reservar un turno
    const [isOpenModalReserva, openModalReserva, closeModalReserva] = useModal(false);

    const openModalReserva1 = (idTurno) => {
        const turnoParaReservar = turnos.find(turno => turno.id === idTurno);
        setTurnoAReservar(turnoParaReservar);
        cambiarEstadoTurno(idTurno);
        openModalReserva();
    }

    const closeModalReserva1 = (idTurno) => {
        setTurnoAReservar([]);
        cambiarEstadoTurno(idTurno);
        closeModalReserva();
    }

    const [componenteActivo, setComponenteActivo] = useState('turnos');

    const handleDotClick = (componente) => {
        setComponenteActivo(componente);
    }

    const idUsuario = getUser().id;
    const idComplejo = cancha.idComplejo;
    const [cliente, setCliente] = useState([]);

    // Nuevo estado para eventos del calendario
    const [calendarEvents, setCalendarEvents] = useState([]);

    // Función para mapear los turnos a eventos del calendario
    const mapTurnosToEvents = (turnos) => {
        return turnos.map((turno) => ({
            title: `Turno en cancha ${turno.idCancha}`,
            start: new Date(turno.horarioInicio),
            end: new Date(turno.horarioFin),
            id: turno.id,
        }));
    };

    useEffect(() => {
        const obtenerInfoCancha = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/cliente/cancha/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
            });

            // Guardar los datos de la cancha
            setCancha(respuesta.data.cancha);
            setComplejo(respuesta.data.complejo);
            setDeporte(respuesta.data.deporte);
            setTurnos(respuesta.data.turnos); // Aquí guardamos los turnos
            setComplejoServicios(respuesta.data.complejoServicios);
            setServicios(respuesta.data.servicios);
            setResenias(respuesta.data.resenias);
            setCanchasComplejo(respuesta.data.canchasComplejo);
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
        obtenerInfoCancha();
        obtenerCliente();
    }, []);

    useEffect(() => {
        // Filtrar y mapear turnos para la cancha seleccionada
        const turnosFiltrados = turnos.filter(turno => turno.idCancha && turno.estadoDisponible === "disponible");
        setTurnosAMostrar(turnosFiltrados); // Si necesitas usar este estado en otra parte
        setCalendarEvents(mapTurnosToEvents(turnosFiltrados)); // Mapear a eventos del calendario
    }, [turnos]); // Dependencia en turnos

    if (loading) {
        return (<Loading />);
    }

    const agregarFavorito = async () => {
        await axios.post(`http://localhost:8000/api/cliente/agregarFavorito`, { idUsuario, idComplejo }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
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
    const idCliente = cliente.id;

    const eliminarFavorito = async () => {
        await axios.post(`http://localhost:8000/api/cliente/eliminarFavorito`, { idCliente, idComplejo }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
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


    const cambiarEstadoTurno = async (id) => {
        await axios.put(`http://localhost:8000/api/cliente/cambiarEstadoTurno/${id}`, { id: id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        }).then(({ data }) => {
            if (data.success) {
                // console.log(data.message);
            }
        });
    }

    return (
        <div className='flex-grow overflow-visible'>
            <div className="flex flex-col mx-auto max-w-[66rem] px-2">
                <div className="relative flex flex-col w-full bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    <img className="object-cover w-full h-[450px]" src="/cancha01.jpg" alt="cancha" />
                    <div className="absolute top-[300px] left-0 p-4 text-neutral-900 dark:text-neutral-200 text-3xl font-bold backdrop-blur-sm bg-white/30 rounded-r-full pr-8">
                        {cancha.nombreCancha}
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
                    <div className="flex flex-row bg-gray-100 dark:bg-neutral-800 h-[65px]">
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('turnos')}>
                                {componenteActivo === 'turnos' ? (
                                    <div className='flex flex-col text-lime-600'>
                                        <div>Turnos</div>
                                        <Dot className='mx-auto' />
                                    </div>
                                ) : (
                                    <div className='flex flex-col'>
                                        <div>Turnos</div>
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    </div>
                                )}
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('datosCancha')}>
                                {componenteActivo === 'datosCancha' ? (
                                    <div className='flex flex-col text-lime-600'>
                                        <div>Datos de Cancha</div>
                                        <Dot className='mx-auto' />
                                    </div>
                                ) : (
                                    <div className='flex flex-col'>
                                        <div>Datos de Cancha</div>
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    </div>
                                )}
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('datosComplejo')}>
                                {componenteActivo === 'datosComplejo' ? (
                                    <div className='flex flex-col text-lime-600'>
                                        <div>Datos de Complejo</div>
                                        <Dot className='mx-auto' />
                                    </div>
                                ) : (
                                    <div className='flex flex-col'>
                                        <div>Datos de Complejo</div>
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    </div>
                                )}
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('resenias')}>
                                {componenteActivo === 'resenias' ? (
                                    <div className='flex flex-col text-lime-600'>
                                        <div>Reseñas</div>
                                        <Dot className='mx-auto' />
                                    </div>
                                ) : (
                                    <div className='flex flex-col'>
                                        <div>Reseñas</div>
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    </div>)}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row bg-gray-100 dark:bg-neutral-800">
                        <>
                            <style>
                                {`
                                .rbc-today {
                                    background-color: #B3B3B3;
                                }
                                
                                .rbc-event {
                                    background-color: #65A30D;
                                }
                            `}
                            </style>
                            <div className="flex flex-col w-full  mt-4 px-4 bg-gray-100 dark:bg-neutral-800 dark:text-white text-black">
                                {componenteActivo === 'turnos' && (
                                    <div className="h-[500px]">
                                        <Calendar
                                            localizer={localizer}
                                            events={calendarEvents}  // Eventos mapeados (turnos)
                                            startAccessor="start"
                                            endAccessor="end"
                                            onSelectEvent={(event) => openModalReserva1(event.id)}
                                            messages={messages} // Traducción personalizada
                                            formats={formats}  // Formatos personalizados
                                            className="dark:text-white bg-white text-black border dark:bg-neutral-800 dark:border-neutral-700"
                                        />
                                    </div>
                                )}
                                {componenteActivo === 'datosCancha' && (
                                    <DatosCancha cancha={cancha} deporte={deporte} />
                                )}

                                {componenteActivo === 'datosComplejo' && (
                                    <DatosComplejo complejo={complejo}
                                        complejoServicios={complejoServicios}
                                        servicios={servicios}
                                        canchasComplejo={canchasComplejo}
                                        diasDisponiblesComplejo={diasDisponiblesComplejo}
                                    />
                                )}

                                {componenteActivo === 'resenias' && (
                                    <Resenias complejo={complejo} resenias={resenias} />
                                )}
                            </div>
                        </>
                    </div>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]">

                    </div>
                </div>
            </div>
            {/* modal para reservar turnos */}
            <ReservarTurno isOpen={isOpenModalReserva}
                closeModal={() => closeModalReserva1(turnoAReservar.id)}
                turno={turnoAReservar}
                cancha={cancha}
                idCliente={cliente.id}
                deporte={deporte} />
        </div>
    )
}

export default Cancha