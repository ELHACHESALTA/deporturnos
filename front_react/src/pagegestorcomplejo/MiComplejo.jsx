import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios';
import EditComplejo from '../components/EditComplejo/EditComplejo';
import CreateComplejo from '../components/CreateComplejo/CreateComplejo';

const MiComplejo = () => {
    const { getUser, getToken } = AuthUser();
    const idUser = getUser().id;
    const [complejo, setComplejo] = useState([]);
    const [diasDisponibles, setDiasDisponibles] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    const [loading, setLoading] = useState(true);

    const mostrarComplejo = async (idUser) => {
        await axios.post(`http://localhost:8000/api/gestorComplejo/miComplejo`, { idUser }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        }).then(response => {
            setComplejo(response.data.complejo);
            setDiasDisponibles(response.data.diasDisponibles);
            setServicios(response.data.servicios);
            setServiciosSeleccionados(response.data.serviciosSeleccionados);
            setLoading(false);
        })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        mostrarComplejo(idUser);
    }, []);

    if (loading) {
        return (
            <div className="flex-grow flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    <p className="mt-4 text-blue-500 text-lg font-semibold">Cargando Mi Complejo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex-grow'>

            {/* Banner */}
            <div className="flex mx-auto max-w-[66rem] px-2">
                <div className="flex justify-center w-full">
                    <div className="bg-gradient-to-r from-lime-500 to-amber-600 dark:from-lime-600 dark:to-amber-700 py-4 rounded-xl w-full max-w-full">
                        <h2 className="text-white dark:text-neutral-900 font-bold text-2xl text-center">MI COMPLEJO</h2>
                    </div>
                </div>
            </div>
            {/* Banner */}

            {complejo.length > 0 ? <EditComplejo complejo={complejo} diasDisponibles={diasDisponibles} servicios={servicios} serviciosSeleccionados={serviciosSeleccionados} /> : <CreateComplejo servicios={servicios} />}
        </div>
    )
}

export default MiComplejo