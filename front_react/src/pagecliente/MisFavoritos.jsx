import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import axios from 'axios'
import Loading from '../components/Loading/Loading'

const MisFavoritos = () => {
  const { getToken, getUser } = AuthUser();
  const [favoritos, setFavoritos] = useState([]);
  const [complejosFavoritos, setComplejosFavoritos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const obtenerMisFavoritos = async () => {
    await axios.post('http://localhost:8000/api/cliente/obtenerMisFavoritos', { idUsuario }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ getToken()
        }
    }).then(({data})=> {
        if(data.success){
          setFavoritos(data.favoritosCliente);
          setComplejosFavoritos(data.complejosFavoritos);
          setLoading(false);
          }
    })
  }

  useEffect(() => {
    obtenerCliente();
    obtenerMisFavoritos();
  }, [])

  if (loading) {
    return (<Loading />);
  }

  const eliminarFavorito = async (idCliente, idComplejo) => {
    await axios.post(`http://localhost:8000/api/cliente/eliminarFavorito`, { idCliente, idComplejo }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(({data})=> {
      if(data.success){
          console.log("eliminado de favoritos exitosamente");
          window.location.reload();
      } else {
          console.log(data.error);
      }
    });
  } 

  return (
    <div>
      <h2>Complejos favoritos</h2>
      <div className="grid grid-cols-1 gap-4">
            {complejosFavoritos.map(complejo => (
                <div key={complejo.id} className="p-4 border rounded-lg shadow">
                    <h2 className="text-lg font-bold">{complejo.nombreComplejo}</h2>
                    <p><strong>Ciudad:</strong> {complejo.ciudad}</p>
                    <p><strong>Ubicación:</strong> {complejo.ubicacion}</p>
                    <p><strong>Creado:</strong> {new Date(complejo.created_at).toLocaleString()}</p>
                    <p><strong>Actualizado:</strong> {new Date(complejo.updated_at).toLocaleString()}</p>
                    <button type='button' onClick={() => eliminarFavorito(cliente.id, complejo.id)}>
                      <p><strong>Eliminar de favoritos</strong></p>
                    </button>                  
                </div>
            ))}
        </div>
    </div>
  )
}

export default MisFavoritos