import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios';
import AuthUser from '../../pageauth/AuthUser';

const ReservarTurno = ({turno, cancha, deporte, idCliente, isOpen, closeModal}) => {
    const {getToken} = AuthUser();

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
        await axios.post('http://localhost:8000/api/cliente/reservarTurno', {idTurno, idCliente}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            }
        }).then(({data})=> {
            if(data.success){
                console.log("Se reservó el turno correctamente");
                window.location.reload();
            } else {
                console.log(data.error);
            }
        });
    }

    //const cantSemanas = 4;

    const buscarTurnoPeriodico = async () => {
        await axios.post('http://localhost:8000/api/cliente/buscarTurnoPeriodico', {idTurno, idCliente, cantSemanas}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            }
        }).then(({data})=> {
            if(data.success){
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
        await axios.post('http://localhost:8000/api/cliente/reservarTurnoPeriodico', {idTurno, idCliente, arregloTurnosPeriodicos}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            }
        }).then(({data})=> {
            if(data.success){
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
            <h2>Información del turno:</h2>
            <div>
                <p>Id del turno: {turno.id}</p>
                <p>Cancha del turno: {cancha.nombreCancha}</p>
                <p>Id del cliente que reserva: {idCliente}</p>
                <p>Deporte: {deporte.id}</p>
            </div>
        {/* Botón de Eliminar */}
        {!confirmarReserva ? (
            <div className="m-6 mt-6">
                <button
                    type="button"
                    onClick={handleConfirmClick}
                    className="py-3 px-4 justify-center inline-flex items-center gap-x-2 text- font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none w-full"
                >
                    Reservar turno
                </button>
            </div>
        ) : (
            <div className="mt-6 mb-6 flex flex-col items-center gap-y-2">
                <span className="text-sm text-gray-800">¿Seguro que deseas reservar el turno?</span>
                <div className="flex gap-x-2">
                    <button
                        type="button"
                        onClick={reservarTurno}
                        className="py-2 px-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
                    >
                        Sí, reservar
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelConfirm}
                        className="py-2 px-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )}

        {!mostrarInputSemanas && (
            <button type='button' onClick={() => setMostrarInputSemanas(true)} className="bg-gray-500 mr-3 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600">
                Buscar reserva periódica
            </button>
        )}

        {mostrarInputSemanas && !mostrarDatosReserva && (
            <div className="mt-4">
                <label htmlFor="cantSemanas" className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="border px-3 py-2 rounded-md w-full mb-2"
                />
                <button
                    type="button"
                    onClick={buscarTurnoPeriodico}
                    className="bg-lime-600 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-lime-700"
                >
                    Buscar
                </button>
                <button
                    type="button"
                    onClick={() => setMostrarInputSemanas(false)}
                    className="py-2 px-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </div>
        )}

        {/* Mostrar los datos obtenidos */}
        {mostrarDatosReserva && (
            <div className="mt-4 mb-4">
                <h3 className="text-lg font-medium">Datos de la reserva periódica:</h3>
                <div className="p-4 bg-green-100 rounded-md">
                    <p><strong>Cancha disponible:</strong></p>
                    <p>Id Cancha: {turno.idCancha}</p>
                    <p>Horario Inicio: {turno.horarioInicio}</p>
                    <p>Horario Fin: {turno.horarioFin}</p>
                    <p>Precio: {turno.precio}</p>
                </div>
                {arregloTurnosPeriodicos.map((turno, index) => (
                    typeof turno === 'string' ? (
                        <p key={index} className="text-red-600">
                            Fecha no disponible: {turno}
                        </p>
                    ) : (
                        <div key={index} className="p-4 bg-green-100 rounded-md">
                            <p><strong>Cancha disponible:</strong></p>
                            <p>Id Cancha: {turno.idCancha}</p>
                            <p>Horario Inicio: {turno.horarioInicio}</p>
                            <p>Horario Fin: {turno.horarioFin}</p>
                            <p>Estado: {turno.estadoDisponible}</p>
                            <p>Precio: {turno.precio}</p>
                        </div>
                    )
                ))}

                <div className='mt-4 mb-4'>
                    <p><strong>Atención:</strong> En caso de confirmar el turno periódico, sólo se reservaran los turnos que se muestran disponibles </p>
                </div>

                {/* Botón para confirmar la reserva periódica */}
                <div className='mt-4'>
                    <button
                        type="button"
                        onClick={reservarTurnoPeriodico}
                        className="bg-lime-600 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-lime-700"
                    >
                        Confirmar Reserva periódica
                    </button>
                    <button
                        type="button"
                        onClick={handleAtras}
                        className="py-2 px-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                    >
                        Atrás
                    </button>
                </div>
                
            </div>
        )}

        <button
                type="button"
                onClick={cancelarReserva}
                className="bg-gray-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
            >
                Cancelar
            </button>
        </Modal>
        

    </div>
  )
}

export default ReservarTurno