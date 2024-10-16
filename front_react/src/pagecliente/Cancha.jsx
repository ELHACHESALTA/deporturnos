import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'
import { Star, Dot } from 'lucide-react';
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

const events = [
    {
        title: 'Reunión de trabajo',
        start: new Date(2024, 9, 15, 10, 0),  // 15 de octubre de 2024, 10:00 AM
        end: new Date(2024, 9, 15, 12, 0),    // 12:00 PM
    },
];

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
                'Authorization': 'Bearer '+ getToken()
            }
        }).then(({data})=> {
            if(data.success){
                setCliente(data.cliente);
            }
        });
    }    
    obtenerInfoCancha();
    obtenerCliente();
    }, []);

    useEffect(() => {
        // Filtrar y mapear turnos para la cancha seleccionada
        const turnosFiltrados = turnos.filter(turno => turno.idCancha);
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
    const idCliente = cliente.id;

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


    const cambiarEstadoTurno = async (id) => {
        await axios.put(`http://localhost:8000/api/cliente/cambiarEstadoTurno/${id}`, { id: id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        }).then(({ data }) => {
            if (data.success) {
                console.log(data.message);
            }
        });
    }

    return (
        <div className='flex-grow overflow-visible'>
            <div className="flex flex-col mx-auto max-w-[66rem] px-2">
                <div className="relative flex flex-col w-full bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden">
                    <img className="object-cover w-full h-[450px]" src="/cancha01.jpg" alt="cancha" />
                    <div className="absolute top-[300px] left-0 p-4 dark:text-white text-3xl font-bold backdrop-blur-sm bg-white/30 rounded-r-full pr-8">
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
                    <div className="flex flex-row bg-gray-100 dark:bg-neutral-800 h-[65px]">
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('turnos')}>
                                <div className='flex flex-col'>
                                    <div>Turnos</div>
                                    {componenteActivo === 'turnos' ? (
                                        <Dot className='mx-auto' /> 
                                    ) : (
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    )}
                                </div>
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('datosCancha')}>
                                <div className='flex flex-col'>
                                    <div>Datos de Cancha</div>
                                    {componenteActivo === 'datosCancha' ? (
                                        <Dot className='mx-auto' /> 
                                    ) : (
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    )}
                                </div>
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('datosComplejo')}>
                                <div className='flex flex-col'>
                                    <div>Datos de Complejo</div>
                                    {componenteActivo === 'datosComplejo' ? (
                                        <Dot className='mx-auto' /> 
                                    ) : (
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    )}
                                </div>
                            </button>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <button type='button' onClick={() => handleDotClick('resenias')}>
                                <div className='flex flex-col'>
                                    <div>Reseñas</div>
                                    {componenteActivo === 'resenias' ? (
                                        <Dot className='mx-auto' /> 
                                    ) : (
                                        <Dot className='mx-auto text-white dark:text-neutral-800' />
                                    )}
                                </div>
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
                            <div className="flex flex-col w-full h-[500px] mt-4 px-2 bg-gray-100 dark:bg-neutral-800 dark:text-white text-black">
                                {componenteActivo === 'turnos' && (
                                    <Calendar
                                        localizer={localizer}
                                        events={calendarEvents}  // Eventos mapeados (turnos)
                                        startAccessor="start"
                                        endAccessor="end"
                                        //onSelectEvent={(event) => alert(`Turno seleccionado: ${event.title}`)}
                                        onSelectEvent={(event) => openModalReserva1(event.id)}
                                        messages={messages} // Traducción personalizada
                                        formats={formats}  // Formatos personalizados
                                        className="dark:text-white bg-white text-black border dark:bg-neutral-800 dark:border-neutral-700"
                                    />
                                )}
                                {componenteActivo === 'datosCancha' && (
                                    <DatosCancha cancha={cancha} deporte={deporte}/>
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
                                    <Resenias complejo={complejo} resenias={resenias}/>
                                )}
                            </div>
                        </>
                    </div>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[25px]">

                    </div>
                </div>
            </div>
            {/* modal para reservar turnos */}
            <ReservarTurno isOpen={isOpenModalReserva} 
             closeModal={() => closeModalReserva1(turnoAReservar.id)} 
             turno={turnoAReservar}
             cancha={cancha}
             idCliente={cliente.id}
             deporte={deporte}/>
            <div className="">
                {/* Sección Datos del Complejo */}
                {/* <div>
                    <button
                        type='button'>
                        Agregar complejo a favoritos
                    </button>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Datos del Complejo</h2>
                    <p><strong>Nombre:</strong> {complejo.nombreComplejo}</p>
                    <p><strong>Ciudad:</strong> {complejo.ciudad}</p>
                    <p><strong>Dirección:</strong> {complejo.ubicacion}</p>
                    Dias disponibles
                    <div>
                        {diasDisponiblesComplejo.map((diaDisponible) => {
                            <p key={diaDisponible.id}>{diaDisponible.dia}</p>
                        })}
                    </div>
                </div> */}

                {/* Sección Información de la Cancha */}
                {/* <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Información de la Cancha Seleccionada</h2>
                    <p><strong>Nombre:</strong> {cancha.nombreCancha}</p>
                    <p><strong>Deporte:</strong> {cancha.idDeporte}</p>
                </div>
                <div>
                    aca va todo informacion
                </div> */}
            </div>

        </div>
    )
}

export default Cancha