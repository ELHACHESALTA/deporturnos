import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';
import CreateTurno from '../components/CreateTurno/CreateTurno';
import CreateTurnoAutomatico from '../components/CreateTurnoAutomatico/CreateTurnoAutomatico';
import { useModal } from '../hooks/useModal';
import EditTurno from '../components/EditTurno/EditTurno';

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

const MisTurnos = () => {
    const { getToken, getUser } = AuthUser();
    const idUser = getUser().id;
    const [canchas, setCanchas] = useState([]);
    const [complejo, setComplejo] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idCanchaSeleccionada, setIdCanchaSeleccionada] = useState(0);
    const [canchaSeleccionada, setCanchaSeleccionada] = useState({});
    const [turnosAMostrar, setTurnosAMostrar] = useState([]);
    const navigate = useNavigate();

    // variable para manejar el modal de creacion de turnos
    const [isOpenModalCreate, openModalCreate, closeModalCreate] = useModal(false);
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);
    const [isOpenModalCreateAutomatico, openModalCreateAutomatico, closeModalCreateAutomatico] = useModal(false);

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

    const obtenerData = async (idUser) => {
        await axios.post(`http://localhost:8000/api/gestorComplejo/obtenerCanchasYTurnos`, { idUser }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(response => {
            setCanchas(response.data.canchas);
            setComplejo(response.data.complejo);
            setTurnos(response.data.turnos);
            setLoading(false);
        })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        obtenerData(idUser);
    }, []);

    if (loading) {
        return (<Loading />)
    }

    // Función para manejar el cambio en el <select>
    const handleCanchaChange = (event) => {
        setTurnosAMostrar([]);
        const selectedValue = parseInt(event.target.value, 10);
        setIdCanchaSeleccionada(selectedValue);
        let canchaSeleccionada = canchas.find(cancha => cancha.id === selectedValue);
        setCanchaSeleccionada(canchaSeleccionada);

        // Filtrar y mapear turnos para la cancha seleccionada
        let turnosFiltrados = turnos.filter(turno => turno.idCancha === selectedValue);
        setTurnosAMostrar(turnosFiltrados);
        setCalendarEvents(mapTurnosToEvents(turnosFiltrados)); // Mapear a eventos del calendario
    };

    return (
        <div className='flex-grow'>

            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 h-24 rounded-3xl w-full flex items-center justify-center border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">MIS TURNOS</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}

            <div className="flex flex-col mx-auto max-w-[66rem] px-2 mt-4">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    {/* Zona de selección */}
                    {complejo === null ? (
                        <Modal isOpen={true}>
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <p className="block text-sm mb-4 dark:text-white mt-4">
                                    Primero debes crear un complejo para acceder a "Mis Canchas"!
                                </p>
                                <button
                                    onClick={() => navigate('/gestorComplejo/miComplejo')}
                                    className="bg-lime-500 text-white border-none px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                >
                                    Ir a Mi Complejo
                                </button>
                            </div>
                        </Modal>
                    ) : (
                        <div className="w-full">
                            {canchas.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Columna izquierda: Select */}
                                        <div className="w-full">
                                            <form className="max-w-sm mx-auto my-4">
                                                <div>
                                                    <label htmlFor="cancha" className="block text-sm mb-4 dark:text-white">Elige una cancha</label>
                                                    <select
                                                        id="cancha"
                                                        name="cancha"
                                                        onChange={handleCanchaChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white"
                                                    >
                                                        <option className="checked:bg-lime-500 dark:checked:text-black" value="0">Ninguna</option>
                                                        {canchas.map((cancha) => (
                                                            <option className="checked:bg-lime-500 dark:checked:text-black" key={cancha.id} value={cancha.id}>
                                                                {cancha.nombreCancha}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        {/* Columna izquierda: Select */}

                                        {/* Columna derecha: Información de la cancha */}
                                        {idCanchaSeleccionada !== 0 ? (
                                            <>
                                                <div className="w-full mt-4">
                                                    <div className=''>
                                                        <div className="block text-sm mb-4 dark:text-white font-bold">{canchaSeleccionada.nombreCancha}</div>
                                                        <div className="block text-sm mb-4 dark:text-white font-bold">Id: {canchaSeleccionada.id}</div>
                                                        <div className="block text-sm mb-4 dark:text-white font-bold">Complejo: {canchaSeleccionada.idComplejo}</div>
                                                        <div className="block text-sm mb-4 dark:text-white font-bold">Deporte: {canchaSeleccionada.idDeporte}</div>
                                                        <div>
                                                            <button onClick={openModalCreate} className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none'>Crear turno manual</button>
                                                        </div>
                                                        <div>
                                                            <button onClick={openModalCreateAutomatico} className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none mt-4'>Crear turno automático</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="block text-sm mb-4 dark:text-white mt-4">No hay una cancha seleccionada.</div>
                                        )}
                                        {/* Columna derecha: Información de la cancha */}
                                    </div>
                                </>
                            ) : (
                                <div className="block text-sm mb-4 dark:text-white mt-4">
                                    No hay canchas en este complejo.
                                </div>
                            )}
                            {/* modal para crear turnos */}
                            <Modal isOpen={isOpenModalCreate} closeModal={closeModalCreate}>
                                <CreateTurno closeModal={closeModalCreate} idCancha={idCanchaSeleccionada} />
                            </Modal>

                            {/* modal para crear turnos automaticos */}
                            <Modal isOpen={isOpenModalCreateAutomatico} closeModal={closeModalCreateAutomatico}>
                                <CreateTurnoAutomatico closeModal={closeModalCreateAutomatico} idCancha={idCanchaSeleccionada} />
                            </Modal>

                            {/* modal para editar o eliminar turnos */}
                            <EditTurno isOpen={isOpenModalEdit} closeModal={closeModalEdit1} turno={turnoAEditar} />
                        </div>
                    )}
                    {/* Zona de selección */}

                    {/* Calendario */}

                    {turnosAMostrar.length > 0 ? (
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
                                        messages={messages} // Traducción personalizada
                                        formats={formats}  // Formatos personalizados
                                        className="dark:text-white bg-white text-black border dark:bg-neutral-800 dark:border-neutral-700"
                                        eventPropGetter={(event) => {
                                            const fechaActual = new Date();
                                            const esPasado = new Date(event.end) < fechaActual;
                                            const esDisponible = turnos.find(turno => turno.id === event.id)?.estadoDisponible === "disponible";

                                            let backgroundColor = "";

                                            if (esPasado) {
                                                backgroundColor = "#ccc";
                                            } else if (esDisponible) {
                                                backgroundColor = "#65A30D";
                                            } else {
                                                backgroundColor = "#DC2626";
                                            }
                                            return {
                                                style: {
                                                    backgroundColor,
                                                    cursor: esPasado ? "not-allowed" : "pointer", // Desactiva el click en turnos pasados
                                                }
                                            };
                                        }}
                                        onSelectEvent={(event) => {
                                            const fechaActual = new Date();
                                            const esPasado = new Date(event.end) < fechaActual;

                                            if (!esPasado) {
                                                openModalEdit1(event.id);  // Solo abre el modal si el turno no ha pasado
                                            }
                                        }}
                                    />
                                </div>

                            </>
                        </div>
                    ) : (
                        <>
                            <div className="mx-auto mt-4">
                                <div className="block text-sm dark:text-white">No hay turnos en esta cancha</div>
                            </div>
                        </>
                    )}
                    {/* Calendario */}
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    )

}

export default MisTurnos