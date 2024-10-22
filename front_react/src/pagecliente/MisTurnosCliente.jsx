import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios'
import Loading from '../components/Loading/Loading'
import { useNavigate } from 'react-router-dom'


const MisTurnosCliente = () => {

    const { getToken, getUser } = AuthUser();
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [complejos, setComplejos] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cliente, setCliente] = useState([]);

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

    const obtenerMisTurnos = async () => {
        await axios.post('http://localhost:8000/api/cliente/obtenerMisTurnos', { idUsuario }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                setReservas(data.reservasCliente);
                setTurnos(data.turnos);
                setCanchas(data.canchas);
                setComplejos(data.complejos);
                setDeportes(data.deportes);
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        obtenerCliente();
        obtenerMisTurnos();
    }, []);

    if (loading) {
        return (<Loading />);
    }

    return (
        <div className="flex-grow">
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
                    <div className="flex flex-col gap-4 p-4">
                        {/* Mensaje si no hay reservas */}
                        {reservas.length === 0 ? (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center px-4 pt-4">
                                <p className="text-gray-600 dark:text-neutral-400 font-semibold">No tienes turnos agregados.</p>
                                <p className="text-gray-500 dark:text-neutral-500">¡Reserva uno para empezar!</p>
                            </div>
                        ) : (
                            <>
                                {/* Sección de Turnos Reprogramables */}
                                {reservas.some((reserva) => {
                                    const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                    const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                                    return diferenciaHoras > turno.timerReprogramacion;
                                }) && (
                                        <>
                                            <h2 className="text-2xl font-bold text-center dark:text-white">Turnos Reprogramables</h2>
                                            <div className="flex max-w-[66rem]">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                                    {reservas
                                                        .filter((reserva) => {
                                                            const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                                            const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                                                            return diferenciaHoras > turno.timerReprogramacion;
                                                        })
                                                        .map((reserva) => {
                                                            const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                                            const cancha = canchas.find((cancha) => cancha.id === turno.idCancha);
                                                            const complejo = complejos.find((complejo) => complejo.id === cancha.idComplejo);
                                                            const deporte = deportes.find((deporte) => deporte.id === cancha.idDeporte);
                                                            const [fechaInicio, horaInicio] = turno.horarioInicio.split(" ");
                                                            const [, horaFin] = turno.horarioFin.split(" ");
                                                            return (
                                                                <div key={reserva.id} className="bg-white rounded-2xl p-4 w-full dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                                                                    <div className="h-full flex flex-col items-center">
                                                                        <div className="my-auto">
                                                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Complejo: {complejo.nombreComplejo}</h3>
                                                                            <h4 className="text-gray-800 dark:text-white">Dirección: {complejo.ubicacion}</h4>
                                                                            <p className="text-sm text-gray-600 dark:text-white">
                                                                                Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                                                                            </p>
                                                                            <div className="flex justify-between mt-2">
                                                                                <p className="text-xs text-gray-500 dark:text-white">Fecha: {fechaInicio}</p>
                                                                                <p className="text-xs text-gray-500 dark:text-white">Horario: {horaInicio} - {horaFin}</p>
                                                                            </div>
                                                                            <div className="flex justify-between items-center mt-4">
                                                                                <p className="text-lg font-medium text-lime-600">Precio: ${turno.precio}</p>
                                                                                <button
                                                                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                                                                    onClick={() => navigate('/cliente/reprogramarTurno', { state: { turno } })}>
                                                                                    Reprogramar
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                {/* Sección de Turnos Futuros */}
                                {reservas.some((reserva) => {
                                    const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                    const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                                    return new Date(turno.horarioFin) > new Date() && diferenciaHoras <= turno.timerReprogramacion;
                                }) && (
                                        <>
                                            <h2 className="text-2xl font-bold text-center dark:text-white border border-neutral-400 dark:border-neutral-600 border-x-0 border-b-0 pt-4">Turnos Futuros</h2>
                                            <div className="flex max-w-[66rem]">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                                    {reservas
                                                        .filter((reserva) => {
                                                            const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                                            const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                                                            return new Date(turno.horarioFin) > new Date() && diferenciaHoras <= turno.timerReprogramacion;
                                                        })
                                                        .map((reserva) => {
                                                            const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                                            const cancha = canchas.find((cancha) => cancha.id === turno.idCancha);
                                                            const complejo = complejos.find((complejo) => complejo.id === cancha.idComplejo);
                                                            const deporte = deportes.find((deporte) => deporte.id === cancha.idDeporte);
                                                            const [fechaInicio, horaInicio] = turno.horarioInicio.split(" ");
                                                            const [, horaFin] = turno.horarioFin.split(" ");
                                                            return (
                                                                <div key={reserva.id} className="bg-white rounded-lg p-4 w-full dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                                                                    <div className="h-full flex flex-col items-center">
                                                                        <div className="my-auto">
                                                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Complejo: {complejo.nombreComplejo}</h3>
                                                                            <h4 className="text-gray-800 dark:text-white">Dirección: {complejo.ubicacion}</h4>
                                                                            <p className="text-sm text-gray-600 dark:text-white">
                                                                                Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                                                                            </p>
                                                                            <div className="flex justify-between mt-2">
                                                                                <p className="text-xs text-gray-500 dark:text-white">Fecha: {fechaInicio}</p>
                                                                                <p className="text-xs text-gray-500 dark:text-white">Horario: {horaInicio} - {horaFin}</p>
                                                                            </div>
                                                                            <div className="flex justify-between items-center mt-2">
                                                                                <p className="text-lg font-medium text-lime-600">Precio: ${turno.precio}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                {/* Sección de Turnos Pasados */}
                                {reservas.some((reserva) => new Date(turnos.find((turno) => turno.id === reserva.idTurno)?.horarioFin) <= new Date()) && (
                                    <>
                                        <h2 className="text-2xl font-bold text-center dark:text-white border border-neutral-400 dark:border-neutral-600 border-x-0 border-b-0 pt-4">Turnos Pasados</h2>
                                        <div className="flex max-w-[66rem]">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                                {reservas
                                                    .filter((reserva) => new Date(turnos.find((turno) => turno.id === reserva.idTurno)?.horarioFin) <= new Date())
                                                    .map((reserva) => {
                                                        const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                                                        const cancha = canchas.find((cancha) => cancha.id === turno.idCancha);
                                                        const complejo = complejos.find((complejo) => complejo.id === cancha.idComplejo);
                                                        const deporte = deportes.find((deporte) => deporte.id === cancha.idDeporte);
                                                        const [fechaInicio, horaInicio] = turno.horarioInicio.split(" ");
                                                        const [, horaFin] = turno.horarioFin.split(" ");
                                                        return (
                                                            <div key={reserva.id} className="bg-white rounded-lg p-4 w-full dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                                                                <div className="h-full flex flex-col items-center">
                                                                    <div className="my-auto">
                                                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Complejo: {complejo.nombreComplejo}</h3>
                                                                        <h4 className="text-gray-800 dark:text-white">Dirección: {complejo.ubicacion}</h4>
                                                                        <p className="text-sm text-gray-600 dark:text-white">
                                                                            Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                                                                        </p>
                                                                        <div className="flex justify-between mt-2">
                                                                            <p className="text-xs text-gray-500 dark:text-white">Fecha: {fechaInicio}</p>
                                                                            <p className="text-xs text-gray-500 dark:text-white">Horario: {horaInicio} - {horaFin}</p>
                                                                        </div>
                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <p className="text-lg font-medium text-lime-600">Precio: ${turno.precio}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    );
}

export default MisTurnosCliente