import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';

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

    const obtenerData = async (idUser) => {
        await axios.post(`http://localhost:8000/api/gestorComplejo/obtenerCanchasYTurnos`, { idUser }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
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

    if (loading){
        return (<Loading/>)
    }

    // Función para manejar el cambio en el <select>
    const handleCanchaChange = (event) => {
        setTurnosAMostrar([]);
        const selectedValue = parseInt(event.target.value, 10);
        setIdCanchaSeleccionada(selectedValue);
        for(let i=0; i < canchas.length; i++){
            if (canchas[i].id === selectedValue){
                setCanchaSeleccionada(canchas[i]);
            }
        }
        let arreglo = [];
        if (turnos.length > 0){
            for(let j=0; j < turnos.length; j++){
                console.log(turnos[j].idCancha);
                console.log(canchaSeleccionada);

                if (turnos[j].idCancha === selectedValue){
                    arreglo.push(turnos[j]);
                }
            }
        }
        setTurnosAMostrar(arreglo);
    };

    console.log(turnosAMostrar);

  return (
    <div className='flex-grow'>
        <h1>Mis turnos</h1>
      {complejo === null ? (
            <Modal isOpen={true}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <p className="text-gray-700 text-xl mb-6">
                        Primero debes crear un complejo para acceder a "Mis Canchas"!
                    </p>
                    <button
                        onClick={() => navigate('/gestorComplejo/miComplejo')}
                        className="bg-blue-500 text-white border-none px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Ir a Mi Complejo
                    </button>
                </div>
            </Modal>
        ) : 
        
        <div>
            {canchas.length > 0 ?
            <>
            <form className="max-w-sm mx-auto mt-10 mb-6">
                <label htmlFor="cancha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Elige la cancha
                </label>
                <select
                id="cancha"
                name="cancha"
                onChange={handleCanchaChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Ninguna</option>
                    {canchas.map((cancha) => (
                        <option key={cancha.id} value={cancha.id}>
                        {cancha.nombreCancha}
                        </option>
                    ))}
                </select>
            </form>
            {idCanchaSeleccionada !== 0 ? (
                <>
            <div>
                <h3>{canchaSeleccionada.nombreCancha}</h3>
                <p className="text-gray-600 mb-1">
                    <strong>Id:</strong> {canchaSeleccionada.id}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Complejo:</strong> {canchaSeleccionada.idComplejo}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Deporte:</strong> {canchaSeleccionada.idDeporte}
                </p>
            </div>
            {turnosAMostrar.length > 0 ?
             <>
                {turnosAMostrar.map((turno) => (
                    <div key={turno.id}>
                        <p><strong>Id:</strong>{turno.id}</p>
                        <p><strong>Id Cancha:</strong>{turno.idCancha}</p>
                        <p><strong>Horario de inicio:</strong>{turno.horarioInicio}</p>
                        <p><strong>Horario de fin:</strong>{turno.horarioFin}</p>
                        <p><strong>Estado:</strong>{turno.estadoDisponible}</p>
                        <p><strong>Metodo de pago:</strong>{turno.metodoPago}</p>
                        <p><strong>Timer Pago:</strong>{turno.timerPago}</p>
                        <p><strong>Reprogramacion:</strong>{turno.timerReprogramacion}</p>
                        <p><strong>Precio:</strong>{turno.precio}</p>
                    </div>
                    ))}
             </>
             :
             <>
                <div>No hay turnos en esta cancha</div>
             </>
              }
            </>
            ) : (
            <div>No hay una cancha seleccionada.</div>
            )}
            </>
          : 
          <div>No hay canchas en este complejo</div>
          }
        </div>
        }
    </div>
  )
}

export default MisTurnos