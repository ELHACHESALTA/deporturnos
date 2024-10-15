import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'
import Loading from '../components/Loading/Loading'

const Cancha = () => {
  const { id } = useParams();
  const {getToken} = AuthUser();

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
    obtenerInfoCancha();
  }, []);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Sección Datos del Complejo */}
      <div>
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
      </div>


      {/* Sección Información de la Cancha */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de la Cancha Seleccionada</h2>
        <p><strong>Nombre:</strong> {cancha.nombreCancha}</p>
        <p><strong>Deporte:</strong> {cancha.idDeporte}</p>
      </div>
      <div>
        aca va todo informacion
      </div>
    </div>
  )
}

export default Cancha