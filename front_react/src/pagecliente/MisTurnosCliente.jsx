import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios'
import Loading from '../components/Loading/Loading'

const MisTurnosCliente = () => {

  const {getToken, getUser} = AuthUser();
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
            'Authorization': 'Bearer '+ getToken()
        }
    }).then(({data})=> {
        if(data.success){
          setCliente(data.cliente);
        }
    });
  }

  const obtenerMisTurnos = async () => {
    await axios.post('http://localhost:8000/api/cliente/obtenerMisTurnos', { idUsuario }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ getToken()
        }
    }).then(({data})=> {
      if(data.success){
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
    <div className="flex flex-col gap-8">
      {/* Sección de Turnos Reprogramables */}
      {reservas.some((reserva) => {
        const turno = turnos.find((turno) => turno.id === reserva.idTurno);
        const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
        return diferenciaHoras > 24;
      }) && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Turnos Reprogramables</h2>
          <div className="flex flex-wrap justify-start gap-4">
            {reservas
              .filter((reserva) => {
                const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                return diferenciaHoras > 24;
              })
              .map((reserva) => {
                const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                const cancha = canchas.find((cancha) => cancha.id === turno.idCancha);
                const complejo = complejos.find((complejo) => complejo.id === cancha.idComplejo);
                const deporte = deportes.find((deporte) => deporte.id === cancha.idDeporte);
                const [fechaInicio, horaInicio] = turno.horarioInicio.split(" ");
                const [, horaFin] = turno.horarioFin.split(" ");
  
                return (
                  <div key={reserva.id} className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="text-xl font-semibold text-gray-800">Complejo: {complejo.nombreComplejo}</h3>
                    <h4>Dirección: {complejo.ubicacion}</h4>
                    <p className="text-sm text-gray-600">
                      Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500">Fecha: {fechaInicio}</p>
                      <p className="text-gray-500">Horario: {horaInicio} - {horaFin}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-medium text-blue-600">Precio: ${turno.precio}</p>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        // onClick={}
                      >
                        Reprogramar
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
  
      {/* Sección de Turnos Futuros */}
      {reservas.some((reserva) => {
        const turno = turnos.find((turno) => turno.id === reserva.idTurno);
        const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
        return new Date(turno.horarioFin) > new Date() && diferenciaHoras <= 24;
      }) && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Turnos Futuros</h2>
          <div className="flex flex-wrap justify-start gap-4">
            {reservas
              .filter((reserva) => {
                const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                const diferenciaHoras = (new Date(turno.horarioInicio) - new Date()) / (1000 * 60 * 60);
                return new Date(turno.horarioFin) > new Date() && diferenciaHoras <= 24;
              })
              .map((reserva) => {
                const turno = turnos.find((turno) => turno.id === reserva.idTurno);
                const cancha = canchas.find((cancha) => cancha.id === turno.idCancha);
                const complejo = complejos.find((complejo) => complejo.id === cancha.idComplejo);
                const deporte = deportes.find((deporte) => deporte.id === cancha.idDeporte);
                const [fechaInicio, horaInicio] = turno.horarioInicio.split(" ");
                const [, horaFin] = turno.horarioFin.split(" ");
  
                return (
                  <div key={reserva.id} className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="text-xl font-semibold text-gray-800">Complejo: {complejo.nombreComplejo}</h3>
                    <h4>Dirección: {complejo.ubicacion}</h4>
                    <p className="text-sm text-gray-600">
                      Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500">Fecha: {fechaInicio}</p>
                      <p className="text-gray-500">Horario: {horaInicio} - {horaFin}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-medium text-blue-600">Precio: ${turno.precio}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
  
      {/* Sección de Turnos Pasados */}
      {reservas.some((reserva) => new Date(turnos.find((turno) => turno.id === reserva.idTurno)?.horarioFin) <= new Date()) && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Turnos Pasados</h2>
          <div className="flex flex-wrap justify-start gap-4">
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
                  <div key={reserva.id} className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="text-xl font-semibold text-gray-800">Complejo: {complejo.nombreComplejo}</h3>
                    <h4>Dirección: {complejo.ubicacion}</h4>
                    <p className="text-sm text-gray-600">
                      Cancha: {cancha.nombreCancha} - Deporte: {deporte.nombreDeporte} {deporte.tipoDeporte}
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500">Fecha: {fechaInicio}</p>
                      <p className="text-gray-500">Horario: {horaInicio} - {horaFin}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-medium text-blue-600">Precio: ${turno.precio}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );  
}

export default MisTurnosCliente