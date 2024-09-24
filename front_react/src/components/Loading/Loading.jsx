import React from 'react'

const Loading = () => {
  return (
    <div className="flex-grow flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-blue-500 text-lg font-semibold">Cargando...</p>
        </div>
    </div>
  )
}

export default Loading