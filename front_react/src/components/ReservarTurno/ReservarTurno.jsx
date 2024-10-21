import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios';
import AuthUser from '../../pageauth/AuthUser';
import { X } from 'lucide-react';

const ReservarTurno = ({ turno, cancha, deporte, idCliente, isOpen, closeModal }) => {
    const { getToken } = AuthUser();

    const [confirmarReserva, setConfirmarReserva] = useState(false);

    const [arregloTurnosPeriodicos, setArregloTurnosPeriodicos] = useState([]);

    const [mostrarInputSemanas, setMostrarInputSemanas] = useState(false);

    const [cantSemanas, setCantSemanas] = useState(2);

    const [mostrarDatosReserva, setMostrarDatosReserva] = useState(false);

    const handleConfirmClick = () => {
        setConfirmarReserva(true);
    };

    const handleCancelConfirm = () => {
        setConfirmarReserva(false);
    };

    const handleAtras = () => {
        setMostrarDatosReserva(false);
        setMostrarInputSemanas(true);
    }

    const cancelarReserva = () => {
        setMostrarDatosReserva(false);
        setMostrarInputSemanas(false);
        setCantSemanas(2);
        closeModal();
    }

    const idTurno = turno.id;


    const reservarTurno = async () => {
        await axios.post('http://localhost:8000/api/cliente/reservarTurno', { idTurno, idCliente }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("Se reservó el turno correctamente");
                window.location.reload();
            } else {
                console.log(data.error);
            }
        });
    }

    //const cantSemanas = 4;

    const buscarTurnoPeriodico = async () => {
        await axios.post('http://localhost:8000/api/cliente/buscarTurnoPeriodico', { idTurno, idCliente, cantSemanas }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("Se buscaron los turnos periódicos");
                console.log(data.arregloTurnosPeriodicos)
                setArregloTurnosPeriodicos(data.arregloTurnosPeriodicos);
                setMostrarDatosReserva(true);
            } else {
                console.log(data.error);
            }
        });
    }

    const reservarTurnoPeriodico = async () => {
        await axios.post('http://localhost:8000/api/cliente/reservarTurnoPeriodico', { idTurno, idCliente, arregloTurnosPeriodicos }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(({ data }) => {
            if (data.success) {
                console.log("Se reservaron los turnos periodicos");
                window.location.reload();
                console.log(data.arregloTurnosPeriodicos);
            } else {
                console.log(data.error);
            }
        });
    }

    const esFecha = (dato) => typeof dato === "string";

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="flex flex-col gap-y-4">
                    <button className="absolute top-0 right-0" onClick={cancelarReserva}>
                        <X className="size-7 dark:text-white" />
                    </button>
                    <div className="text-md font-medium  text-center dark:text-white underline underline-offset-4">Información del turno:</div>
                    <div className="text-sm font-medium text-center dark:text-white border border-neutral-900 dark:border-white border-x-0 border-t-0">
                        <p>Id del turno: {turno.id}</p>
                        <p>Cancha del turno: {cancha.nombreCancha}</p>
                        <p>Id del cliente que reserva: {idCliente}</p>
                        <p className="mb-4">Deporte: {deporte.id}</p>
                    </div>
                    {/* Botón de Eliminar */}
                    {!confirmarReserva ? (
                        <div className="border border-neutral-900 dark:border-white border-x-0 border-t-0">
                            <button
                                type="button"
                                onClick={handleConfirmClick}
                                className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none mb-4"
                            >
                                Reservar turno individual
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-y-4 border border-neutral-900 dark:border-white border-x-0 border-t-0">
                            <span className="text-sm font-medium text-center dark:text-white">¿Seguro que deseas reservar este turno?</span>
                            <div className="flex gap-x-2 mb-4">
                                <button
                                    type="button"
                                    onClick={reservarTurno}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Sí, reservar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelConfirm}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-gray-300 text-black hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                    {!mostrarInputSemanas && (
                        <div>
                            <button type='button' onClick={() => setMostrarInputSemanas(true)} className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                                Buscar reserva periódica
                            </button>
                        </div>
                    )}
                    {mostrarInputSemanas && !mostrarDatosReserva && (
                        <>
                            <label htmlFor="cantSemanas" className="text-sm font-medium text-center dark:text-white">
                                ¿Por cuantas semanas seguidas quiere el mismo turno?
                            </label>
                            <input
                                type="number"
                                id='cantSemanas'
                                name='cantSemanas'
                                min={2}
                                value={cantSemanas}
                                onChange={(e) => setCantSemanas(e.target.value)}
                                placeholder="Cantidad de semanas"
                                className="py-2 px-4 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                            />
                            <div className="flex flex-row gap-4 justify-center">
                                <button
                                    type="button"
                                    onClick={buscarTurnoPeriodico}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Buscar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMostrarInputSemanas(false)}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-gray-300 text-black hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}
                    {/* Mostrar los datos obtenidos */}
                    {mostrarDatosReserva && (
                        <>
                            <div className="text-md font-medium  text-center dark:text-white underline underline-offset-4">Datos de la reserva periódica:</div>
                            <div className="flex mx-auto max-w-[66rem] px-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    <div className="">
                                        <div className="h-full flex flex-col items-center p-4 bg-white dark:bg-neutral-900 dark:text-white rounded-2xl">
                                            <div className="my-auto">
                                                <div><strong>Cancha disponible:</strong></div>
                                                <div>Id Cancha: {turno.idCancha}</div>
                                                <div>Horario Inicio: {turno.horarioInicio}</div>
                                                <div>Horario Fin: {turno.horarioFin}</div>
                                                <div>Precio: {turno.precio}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {arregloTurnosPeriodicos.map((turno, index) => (
                                        typeof turno === 'string' ? (
                                            <div key={index} className="flex items-center text-red-600 p-4 bg-white dark:bg-neutral-900 rounded-2xl">
                                                Fecha no disponible: {turno}
                                            </div>
                                        ) : (
                                            <div key={index} className="h-full flex flex-col items-center p-4 bg-white dark:bg-neutral-900 dark:text-white rounded-2xl">
                                                <div className="my-auto">
                                                    <div><strong>Cancha disponible:</strong></div>
                                                    <div>Id Cancha: {turno.idCancha}</div>
                                                    <div>Horario Inicio: {turno.horarioInicio}</div>
                                                    <div>Horario Fin: {turno.horarioFin}</div>
                                                    <div>Precio: {turno.precio}</div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className="text-sm text-center dark:text-white"><strong>Atención:</strong> En caso de confirmar el turno periódico, sólo se reservaran los turnos que se muestran disponibles.</div>
                            {/* Botón para confirmar la reserva periódica */}
                            <div className="flex flex-row gap-4 justify-center">
                                <button
                                    type="button"
                                    onClick={reservarTurnoPeriodico}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Confirmar reserva periódica
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAtras}
                                    className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-gray-300 text-black hover:bg-gray-400"
                                >
                                    Atrás
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default ReservarTurno