import React from 'react'

function Bienvenida() {
    return (
        <div className="flex-grow">
            <div className="flex flex-col mx-auto max-w-[66rem] px-2">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-700/70">
                    <div className="relative overflow-hidden">
                        <div className="max-w-[66rem] mx-auto px-4">
                            <div className="max-w-2xl text-center mx-auto mt-6">
                                <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">Vista de <span className="text-lime-600">Administrador</span></h1>
                            </div>

                            <div className="relative max-w-5xl mx-auto mt-6">
                                <img className="w-full object-cover h-96 sm:h-[480px] bg-no-repeat bg-center bg-cover rounded-2xl" src="/vistaBienvenida.jpg" alt="vistaBienvenida" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row dark:bg-neutral-800 w-full h-[16px]"></div>
                </div>
            </div>
        </div>
    )
}

export default Bienvenida