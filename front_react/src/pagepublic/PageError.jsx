import React from 'react'
import { ChevronLeft } from 'lucide-react';

const PageError = () => {
    return (
        <div className="max-w-[50rem] flex flex-col mx-auto size-full">
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
                <p className="mt-3 text-gray-600 font-bold dark:text-neutral-400 mb-10">Página no encontrada</p>
                <p className="text-gray-600 dark:text-neutral-400 mb-10">Lo sentimos, la página que estás buscando no existe.</p>
                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                    <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none" href="/">
                        <ChevronLeft className="shrink-0 size-4" />
                        Volver a la página principal
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PageError