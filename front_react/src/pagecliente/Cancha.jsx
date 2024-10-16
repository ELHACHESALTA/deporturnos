import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'
import { Star, Dot } from 'lucide-react';
import { useModal } from '../hooks/useModal';

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
    const { getToken } = AuthUser();

    const [cancha, setCancha] = useState([]);
    const [complejo, setComplejo] = useState([]);
    const [deporte, setDeporte] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [complejoServicios, setComplejoServicios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [resenias, setResenias] = useState([]);
    const [canchasComplejo, setCanchasComplejo] = useState([]);
    const [diasDisponiblesComplejo, setDiasDisponiblesComplejo] = useState([]);

    const [loading, setLoading] = useState(true);

    const [turnosAMostrar, setTurnosAMostrar] = useState([]);

    // variable para manejar el modal de creacion de turnos
    const [isOpenModalCreate, openModalCreate, closeModalCreate] = useModal(false);
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);

    const [turnoAEditar, setTurnoAEditar] = useState([]);


    const openModalEdit1 = (idTurno) => {
        const turnoParaEditar = turnos.find(turno => turno.id === idTurno);
        setTurnoAEditar(turnoParaEditar);
        openModalEdit();
    }

    const closeModalEdit1 = () => {
        setTurnoAEditar([]);
        closeModalEdit();
    }

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

    const obtenerInfoCancha = async () => {
        const respuesta = await axios.get(`http://localhost:8000/api/cliente/cancha/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        console.log(respuesta.data);
        setCancha(respuesta.data.cancha);
        setComplejo(respuesta.data.complejo);
        setDeporte(respuesta.data.deporte);
        setTurnos(respuesta.data.turnos);
        setComplejoServicios(respuesta.data.complejoServicios);
        setServicios(respuesta.data.servicios);
        setResenias(respuesta.data.resenias);
        setCanchasComplejo(respuesta.data.canchasComplejo);
        setDiasDisponiblesComplejo(respuesta.data.diasComplejo);
        setLoading(false);
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
            setLoading(false);
        };

        obtenerInfoCancha();
    }, [id, getToken]);

    useEffect(() => {
        // Filtrar y mapear turnos para la cancha seleccionada
        const turnosFiltrados = turnos.filter(turno => turno.idCancha);
        setTurnosAMostrar(turnosFiltrados); // Si necesitas usar este estado en otra parte
        setCalendarEvents(mapTurnosToEvents(turnosFiltrados)); // Mapear a eventos del calendario
    }, [turnos]); // Dependencia en turnos

    if (loading) {
        return (<Loading />);
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
                        <Star size={52} className="text-yellow-500" />
                        <Star size={52} className="text-yellow-500 hidden" fill="#EAB308" />
                    </div>
                    <div className="flex flex-row bg-gray-100 dark:bg-neutral-800 h-[65px]">
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                            <div className='flex flex-col'>
                                <div>Turnos</div>
                                <Dot className='mx-auto' />
                            </div>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                        <div className='flex flex-col'>
                                <div>Datos de Cancha</div>
                                <Dot className='mx-auto text-white dark:text-neutral-800' />
                            </div>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                        <div className='flex flex-col'>
                                <div>Datos de Complejo</div>
                                <Dot className='mx-auto text-white dark:text-neutral-800' />
                            </div>
                        </div>
                        <div className="basis-1/4 flex justify-center items-end font-bold dark:text-white">
                        <div className='flex flex-col'>
                                <div>Reseñas</div>
                                <Dot className='mx-auto text-white dark:text-neutral-800' />
                            </div>
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
                                <Calendar
                                    localizer={localizer}
                                    events={calendarEvents}  // Eventos mapeados (turnos)
                                    startAccessor="start"
                                    endAccessor="end"
                                    onSelectEvent={(event) => alert(`Turno seleccionado: ${event.title}`)}
                                    // onSelectEvent={(event) => openModalEdit1(event.id)}
                                    messages={messages} // Traducción personalizada
                                    formats={formats}  // Formatos personalizados
                                    className="dark:text-white bg-white text-black border dark:bg-neutral-800 dark:border-neutral-700"
                                />
                            </div>
                        </>
                    </div>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[25px]">

                    </div>
                </div>
            </div>

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