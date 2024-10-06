import React from "react";

const Footer = () => {
    return (
        <footer className="dark:bg-neutral-900">
            <div className="mt-auto border-t md:border-t-0 border-gray-200 dark:border-neutral-700">
                <div className="w-full max-w-[66rem] py-3 px-6 mx-auto">
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
                        <div>
                            {/* Logo */}
                            <a className="flex items-center justify-center md:justify-start rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Home">
                                <img className="w-36 h-auto block dark:hidden" src="/logoLight.png" alt="deporturnos" />
                                <img className="w-36 h-auto hidden dark:block" src="/logoDark.png" alt="deporturnos" />
                            </a>
                            {/* Logo */}
                        </div>

                        {/* <!-- End Col --> */}
                        <ul className="text-center">
                            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-black dark:before:text-white">
                                <a className="inline-flex gap-x-2 text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300" href="#">
                                    Nosotros
                                </a>
                            </li>
                            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-black dark:before:text-white">
                                <a className="inline-flex gap-x-2 text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300" href="#">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                        {/* <!-- End Col --> */}

                        {/* <!-- Social Brands --> */}
                        <div className="flex text-center md:text-end space-x-2 gap-5 justify-end">
                            <a className="size-8 inline-flex justify-center md:justify-end items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-black hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-neutral-400" href="https://github.com/guillermoagueronqn">
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <div className="">
                                    Guille
                                </div>
                            </a>
                            <a className="size-8 inline-flex justify-center md:justify-end items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-black hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-neutral-400" href="https://github.com/ELHACHESALTA">
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <div>Fede</div>
                            </a>
                        </div>
                        {/* <!-- End Social Brands --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer;