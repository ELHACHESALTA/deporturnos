import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser';
import Loading from '../components/Loading/Loading';
import axios from 'axios';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modal/Modal';

// Inicio configuraciones de React Big Calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Inicio traducción al español
import 'moment/locale/es';


const ReprogramarTurno = () => {
    const location = useLocation();
    const { turno } = location.state;

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

    const { getToken, getUser } = AuthUser();
    const navigate = useNavigate();
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
    const [cliente, setCliente] = useState([]);

    const [loading, setLoading] = useState(true);
    const [turnosAMostrar, setTurnosAMostrar] = useState([]);

    const [nuevoTurno, setNuevoTurno] = useState([]);

    const id = turno.idCancha;
    const idUsuario = getUser().id;

    const [isOpenModalReprogramar, openModalReprogramar, closeModalReprogramar] = useModal(false);

    const openModalReprogramar1 = (idTurno) => {
        const turnoParaReservar = turnos.find(turno => turno.id === idTurno);
        setNuevoTurno(turnoParaReservar);
        openModalReprogramar();
    }

    const closeModalReprogramar1 = () => {
        setNuevoTurno([]);
        closeModalReprogramar();
    }

    // Nuevo estado para eventos del calendario
    const [calendarEvents, setCalendarEvents] = useState([]);

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

    const eventStyleGetter = (event) => {
        // Comprueba si el evento es el turno seleccionado
        if (event.id === turno.id) {
            return {
                style: {
                    backgroundColor: '#FF5733', // Color de fondo para el turno seleccionado
                    border: '1px solid #C70039', // Color de borde para el turno seleccionado
                    color: 'white', // Color del texto
                },
            };
        }
        return {
            style: {},
        };
    };

    const idTurnoADescartar = turno.id;
    const idTurnoNuevo = nuevoTurno.id;
    const idCliente = cliente.id;

    const confirmarReprogramacion = async () => {
        await axios.post(`http://localhost:8000/api/cliente/reprogramarReserva`, { idTurnoADescartar, idTurnoNuevo, idCliente }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        }).then(({ data }) => {
            if (data.success) {
                navigate('/cliente/misTurnosCliente');
            } else {
                console.log(data.error);
            }
        });
    }

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Función para formatear fecha y hora
    const formatearFechaHora = (fechaCompleta) => {
        if (!fechaCompleta) return { fechaFormateada: "", horaFormateada: "" };
        const [fecha, hora] = fechaCompleta.split(" ");
        const [anio, mes, dia] = fecha.split("-");
        const [horaInicio, minutos] = hora.split(":");

        const nombreMes = meses[parseInt(mes, 10) - 1];
        const fechaFormateada = `${dia} de ${nombreMes} de ${anio}`;
        const horaFormateada = `${horaInicio}:${minutos}`;

        return { fechaFormateada, horaFormateada };
    };

    const { fechaFormateada: fechaInicioTurno, horaFormateada: horaInicioTurno } = formatearFechaHora(turno.horarioInicio);
    const { fechaFormateada: fechaFinTurno, horaFormateada: horaFinTurno } = formatearFechaHora(turno.horarioFin);

    const { fechaFormateada: fechaInicioNuevoTurno, horaFormateada: horaInicioNuevoTurno } = formatearFechaHora(nuevoTurno.horarioInicio || "");
    const { fechaFormateada: fechaFinNuevoTurno, horaFormateada: horaFinNuevoTurno } = formatearFechaHora(nuevoTurno.horarioFin || "");

    return (
        <div className="flex-grow">
            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 h-24 rounded-3xl w-full flex items-center justify-center border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">REPROGRAMAR TURNO</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}
            <div className="flex flex-col mx-auto max-w-[66rem] px-2 mt-4">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    <h1 className="text-2xl font-bold text-center my-4 dark:text-white">Elige un nuevo turno</h1>
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
                                    //onSelectEvent={(event) => alert(`Turno seleccionado: ${event.title}`)}
                                    onSelectEvent={(event) => openModalReprogramar1(event.id)}
                                    messages={messages} // Traducción personalizada
                                    formats={formats}  // Formatos personalizados
                                    eventPropGetter={eventStyleGetter}
                                    className="dark:text-white bg-white text-black border dark:bg-neutral-800 dark:border-neutral-700"
                                />
                            </div>
                        </>
                    </div>

                    {/* Modal para confirmar reprogramación */}
                    <Modal isOpen={isOpenModalReprogramar} closeModal={closeModalReprogramar}>
                        <div className="flex flex-col gap-y-4">
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">Turno a descartar:</h1>
                            <div className="flex justify-center">
                                <div className="text-md text-gray-800 dark:text-white flex flex-col items-start">
                                    <div><strong>Fecha:</strong> {fechaInicioTurno}</div>
                                    <div><strong>Horario Inicio:</strong> {horaInicioTurno}</div>
                                    <div><strong>Horario Fin:</strong> {horaFinTurno}</div>
                                    <div><strong>Precio:</strong> {turno.precio}</div>
                                </div>
                            </div>
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">Turno nuevo a reservar:</h1>
                            <div className="flex justify-center">
                                <div className="text-md text-gray-800 dark:text-white flex flex-col items-start">
                                    <div><strong>Fecha:</strong> {fechaInicioNuevoTurno}</div>
                                    <div><strong>Horario Inicio:</strong> {horaInicioNuevoTurno}</div>
                                    <div><strong>Horario Fin:</strong> {horaFinNuevoTurno}</div>
                                    <div><strong>Precio:</strong> {nuevoTurno.precio}</div>
                                </div>
                            </div>
                            <h2 className="text-md font-bold text-gray-800 dark:text-white">¿Desea confirmar la operación?</h2>
                            <div className="flex flex-row gap-4 justify-center">
                                <button
                                    type="button"
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={confirmarReprogramacion}
                                >
                                    Confirmar
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModalReprogramar1}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-gray-300 text-black hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Modal>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>

            </div>
        </div>
    )
}

export default ReprogramarTurno