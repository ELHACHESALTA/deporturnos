import React from 'react'

const DatosCancha = ({ cancha, deporte }) => {
  return (
    <div className="flex flex-row h-[65px] bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-700 p-4">
      <div className="basis-1/3 flex justify-center items-center text-sm font-bold dark:text-white">ID: {cancha.id}</div>
      <div className="basis-1/3 flex justify-center items-center text-sm font-bold dark:text-white">Nombre de la cancha: {cancha.nombreCancha}</div>
      <div className="basis-1/3 flex justify-center items-center text-sm font-bold dark:text-white">Deporte: {deporte.nombreDeporte} - {deporte.tipoDeporte}</div>
    </div>
  )
}

export default DatosCancha