import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser';

const VerCanchas = () => {
    const {getToken} = AuthUser();
    const [canchas, setCanchas] = useState([]);
    const [complejos, setComplejos] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [servicios, setServicios] = useState([]);
    // Función para obtener todas las canchas disponibles en el sistema
    const obtenerCanchas = async () => {
        const respuesta = await axios.get('http://localhost:8000/api/cliente/verCanchas', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        });
        console.log(respuesta.data);
        setCanchas(respuesta.data.canchas);
    };

    useEffect(() => {
        obtenerCanchas();
    }, []);
  return (
    <div className='flex-grow text-black'>
        <div className="max-w-lg mx-auto my-5 p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Canchas Disponibles</h2>
            
            {/* Tarjeta de cancha */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                <h3 className="text-xl font-semibold">Nombre de la cancha</h3>
                <p className="text-gray-700"><strong>Complejo:</strong> Nombre del complejo</p>
                <p className="text-gray-700"><strong>Ciudad:</strong> Ciudad del complejo</p>
                <p className="text-gray-700"><strong>Calle:</strong> Calle del complejo</p>
                <p className="text-gray-700"><strong>Deporte:</strong> Deporte de la cancha</p>
                
                {/* Servicios */}
                <div className="mt-2">
                <h4 className="font-medium">Servicios Disponibles:</h4>
                <ul className="list-disc list-inside">
                    {servicios.map((servicio) => (
                    <li key={servicio.id} className="text-gray-600">{servicio.descripcionServicio}</li>
                    ))}
                </ul>
                </div>
            </div>

            {/* Botón de acción */}
            <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Reservar Cancha
                </button>
            </div>
        </div>
    </div>
  )
}

export default VerCanchas