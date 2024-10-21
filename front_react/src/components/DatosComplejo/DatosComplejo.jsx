import React from 'react'

const DatosComplejo = ({ complejo, complejoServicios, servicios, canchasComplejo, diasDisponiblesComplejo }) => {
    const serviciosComplejo = complejoServicios.map((complejoServicio) => {
        const servicio = servicios.find(s => s.id === complejoServicio.idServicio);
        return servicio ? servicio.descripcionServicio : null;
    }).filter(Boolean);

    return (
        <div className="flex flex-row h-[65px] bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-700 p-4">
            <div className="basis-1/5 flex justify-center items-center text-sm font-bold dark:text-white">Nombre: {complejo.nombreComplejo}</div>
            <div className="basis-1/5 flex justify-center items-center text-sm font-bold dark:text-white">Ciudad: {complejo.ciudad}</div>
            <div className="basis-1/5 flex justify-center items-center text-sm font-bold dark:text-white">Calle: {complejo.ubicacion}</div>
            <div className="basis-1/5 flex justify-center items-center text-sm  font-bold dark:text-white">Servicios del Complejo: </div>
            <div className="basis-1/5 flex justify-center items-center text-sm font-bold dark:text-white">
                <ul>
                    {serviciosComplejo.length > 0 ? (
                        serviciosComplejo.map((servicio, index) => (
                            <li key={index} className="text-lime-600">{servicio}</li>
                        ))
                    ) : (
                        <p>No hay servicios disponibles para este complejo.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default DatosComplejo