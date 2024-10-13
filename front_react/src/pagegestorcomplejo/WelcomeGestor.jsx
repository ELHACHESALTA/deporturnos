import React from "react";

const  WelcomeGestor = () => {
    return (
        <div className="flex-grow">
            <div className="relative overflow-hidden">
                <div className="max-w-[66rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="max-w-2xl text-center mx-auto">
                        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">Vista de <span className="text-lime-600">Gestor de Complejo</span></h1>
                    </div>

                    <div className="mt-10 relative max-w-5xl mx-auto">
                        <img className="w-full object-cover h-96 sm:h-[480px] bg-no-repeat bg-center bg-cover rounded-xl" src="/vistaBienvenida.jpg" alt="vistaBienvenida" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeGestor;