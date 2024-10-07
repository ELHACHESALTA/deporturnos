import React from "react";

const PageHome = () => {
    return (
        <div className="flex-grow dark:bg-neutral-900  dark:text-white">
            {/* Carrusel */}
            <div data-hs-carousel='{
                    "loadingClasses": "opacity-0",
                    "isInfiniteLoop": true,
                    "slidesQty": 1
                }' className="relative max-w-[66rem] mx-auto">
                <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
                    <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">First slide</span>
                            </div>
                        </div>
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Second slide</span>
                            </div>
                        </div>
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Third slide</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span className="text-2xl" aria-hidden="true">
                        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                    </span>
                    <span className="sr-only">Previous</span>
                </button>
                <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span className="sr-only">Next</span>
                    <span className="text-2xl" aria-hidden="true">
                        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </span>
                </button>

                <div className="dark:bg-neutral-600 hs-carousel-info inline-flex justify-center px-4 absolute bottom-3 start-[50%] -translate-x-[50%] bg-white rounded-lg">
                    <span className="hs-carousel-info-current me-1">0</span>
                    /
                    <span className="hs-carousel-info-total ms-1">0</span>
                </div>
            </div>
            {/* Carrusel */}
        </div>
    )
}

export default PageHome;