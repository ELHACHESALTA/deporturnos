import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios';
import EditComplejo from '../components/EditComplejo/EditComplejo';
import CreateComplejo from '../components/CreateComplejo/CreateComplejo';

const MiComplejo = () => {
    const { getUser, getToken } = AuthUser();
    const idUser = getUser().id;
    const [complejo, setComplejo] = useState([]);    

    const [loading, setLoading] = useState(true);

    const mostrarComplejo = async (idUser) => {
        await axios.post(`http://localhost:8000/api/gestorComplejo/miComplejo`, { idUser }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            }
        }).then(response => {
            setComplejo(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setLoading(false);
        });
    };
    
    useEffect(()=>{
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
            {console.log(complejo)}
            {complejo.length > 0 ? <EditComplejo complejo={complejo}/> : <CreateComplejo/>}
        </div>
    )
}

export default MiComplejo