import React from "react";

const PageHome = () => {
    return (
        <div className="flex-grow mx-auto">
            <div className="flex flex-row  dark:text-white px-2 max-w-[66rem]">
                <div className="relative p-6 md:p-16">
                    {/* Caracteristicas */}
                    <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
                        {/* Cartas */}
                        <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                            <nav className="grid" aria-label="Tabs" role="tablist" aria-orientation="vertical">
                                <button type="button" className="hs-tab-active:bg-white mb-2 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active" id="tabs-with-card-item-1" aria-selected="true" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
                                    <span className="flex gap-x-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-lime-600 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                                        <span className="grow">
                                            <span className="block text-lg font-semibold hs-tab-active:text-lime-500 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200">Complejos</span>
                                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Reserva fácilmente y accede a múltiples opciones en un solo lugar. Recorre las diferentes instalaciones deportivas que ofrecen una variedad de canchas y servicios.</span>
                                        </span>
                                    </span>
                                </button>

                                <button type="button" className="hs-tab-active:bg-white mb-2 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
                                    <span className="flex gap-x-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-lime-600 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                                        <span className="grow">
                                            <span className="block text-lg font-semibold hs-tab-active:text-lime-500 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200">Canchas</span>
                                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Encuentra canchas de fútbol y pádel listas para adaptarse a tus horarios y necesidades.</span>
                                        </span>
                                    </span>
                                </button>

                                <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="tabs-with-card-item-3" aria-selected="false" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab">
                                    <span className="flex gap-x-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-lime-600 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                        <span className="grow">
                                            <span className="block text-lg font-semibold hs-tab-active:text-lime-500 text-gray-800 dark:hs-tab-active:text-lime-500 dark:text-neutral-200">Clientes</span>
                                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Gestiona los turnos de tus complejos y canchas favoritas en un solo lugar.</span>
                                        </span>
                                    </span>
                                </button>
                            </nav>
                        </div>
                        {/* Cartas */}

                        <div className="lg:col-span-7">
                            <div className="relative flex justify-center">
                                {/* <!-- Tab Content --> */}
                                <div>
                                    <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
                                        <img className="h-[600px] w-[500px] shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="/cancha01.jpg" alt="cancha1" />
                                    </div>

                                    <div id="tabs-with-card-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                                        <img className="h-[600px] w-[500px] shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="/cancha02.jpg" alt="cancha2" />
                                    </div>

                                    <div id="tabs-with-card-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                                        <img className="h-[600px] w-[500px] shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="/cancha03.jpg" alt="cancha3" />
                                    </div>
                                </div>
                                {/* <!-- End Tab Content --> */}

                            </div>
                        </div>
                    </div>
                    {/* Caracteristicas */}

                    {/* Fondo */}
                    <div className="absolute inset-0 grid grid-cols-12 size-full">
                        <div className="col-span-full bg-gray-100 w-full rounded-xl h-full dark:bg-neutral-800"></div>
                    </div>
                    {/* Fondo */}
                </div>
            </div>
        </div>
    )
}

export default PageHome;