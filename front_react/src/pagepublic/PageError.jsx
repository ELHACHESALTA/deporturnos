import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageError = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Página no encontrada</h1>
        <p className="text-gray-500 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300"
        >
          Volver a la página principal
        </button>
      </div>
    </div>

  )
}

export default PageError