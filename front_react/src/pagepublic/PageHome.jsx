import React from "react";

const PageHome = () => {
    return (
        <div className="flex-grow mx-auto dark:bg-neutral-900">
            <div className="flex flex-row  dark:text-white px-2 md:min-w-[66rem] max-w-[66rem]">
                <div className="basis-3/4">
                    {/* Carrusel */}
                    <div data-hs-carousel='{
                        "loadingClasses": "opacity-0",
                        "isInfiniteLoop": true,
                        "slidesQty": 1
                    }' className="relative mx-auto">
                        <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
                            <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                                <div className="hs-carousel-slide">
                                    <div className="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900 gap-4">
                                        <img src="/cancha01.jpg" alt="cancha1" />
                                        <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Club Biguá – Cancha 1 (azul)</span>
                                    </div>
                                </div>
                                <div className="hs-carousel-slide">
                                    <div className="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800 gap-4">
                                        <img src="/cancha02.jpg" alt="cancha2" />
                                        <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Club Biguá – Cancha 2 (verde)</span>
                                    </div>
                                </div>
                                <div className="hs-carousel-slide">
                                    <div className="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700 gap-4">
                                        <img src="/cancha03.jpg" alt="cancha3" />
                                        <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Club Alta Barda – Cancha 3</span>
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
                <div className="bases-1/4">
                    {/* Vista de Árbol */}
                    <div className="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
                        {/* <!-- 1st Level Accordion Group --> */}
                        <div className="hs-accordion-group">
                            {/* <!-- 1st Level Accordion --> */}
                            <div className="hs-accordion active" role="treeitem" aria-expanded="true" id="hs-close-currently-opened-tree-heading-one">
                                {/* <!-- 1st Level Accordion Heading --> */}
                                <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="true" aria-controls="hs-close-currently-opened-tree-collapse-one">
                                        <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                                        </svg>
                                    </button>

                                    <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                        <div className="flex items-center gap-x-3">
                                            <div className="grow">
                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                    Fútbol
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End 1st Level Accordion Heading --> */}

                                {/* <!-- 1st Level Collapse --> */}
                                <div id="hs-close-currently-opened-tree-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-close-currently-opened-tree-heading-one">
                                    {/* <!-- 2nd Level Accordion Group --> */}
                                    <div className="hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                        {/* <!-- 2nd Level Nested Accordion --> */}
                                        <div className="hs-accordion active" role="treeitem" aria-expanded="true" id="hs-close-currently-opened-tree-sub-heading-one">
                                            {/* <!-- 2nd Level Accordion Heading --> */}
                                            <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                                <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="true" aria-controls="hs-close-currently-opened-tree-sub-collapse-one">
                                                    <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                                                    </svg>
                                                </button>

                                                <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="grow">
                                                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                Fútbol 5
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Accordion Heading --> */}

                                            {/* <!-- 2nd Level Collapse --> */}
                                            <div id="hs-close-currently-opened-tree-sub-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-close-currently-opened-tree-sub-heading-two">
                                                <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Canchas Versus
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}

                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Complejo Candelaria
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}

                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Coco F.C.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Collapse --> */}
                                        </div>
                                        {/* <!-- End 2nd Level Nested Accordion --> */}

                                        {/* <!-- 2nd Level Nested Accordion --> */}
                                        <div className="hs-accordion" role="treeitem" aria-expanded="false" id="hs-close-currently-opened-tree-sub-heading-two">
                                            {/* <!-- 2nd Level Accordion Heading --> */}
                                            <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                                <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-close-currently-opened-tree-sub-collapse-two">
                                                    <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                                                    </svg>
                                                </button>

                                                <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="grow">
                                                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                Fútbol 8
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Accordion Heading --> */}

                                            {/* <!-- 2nd Level Collapse --> */}
                                            <div id="hs-close-currently-opened-tree-sub-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-close-currently-opened-tree-sub-heading-two">
                                                <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Complejo Q
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}

                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Fanaticos Fútbol
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}

                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Puro Fútbol
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Collapse --> */}
                                        </div>
                                        {/* <!-- End 2nd Level Nested Accordion --> */}

                                        {/* <!-- 2nd Level Nested Accordion --> */}
                                        <div className="hs-accordion" role="treeitem" aria-expanded="false" id="hs-close-currently-opened-tree-sub-heading-three">
                                            {/* <!-- 2nd Level Accordion Heading --> */}
                                            <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                                <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-close-currently-opened-tree-sub-collapse-three">
                                                    <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                                                    </svg>
                                                </button>

                                                <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="grow">
                                                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                Fútbol 11
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Accordion Heading --> */}

                                            {/* <!-- 2nd Level Collapse --> */}
                                            <div id="hs-close-currently-opened-tree-sub-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-close-currently-opened-tree-sub-heading-three">
                                                <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                                    {/* <!-- 2nd Level Item --> */}
                                                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="grow">
                                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                                    Club Atlético Neuquén
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- End 2nd Level Item --> */}
                                                </div>
                                            </div>
                                            {/* <!-- End 2nd Level Collapse --> */}
                                        </div>
                                        {/* <!-- End 2nd Level Nested Accordion --> */}
                                    </div>
                                    {/* <!-- 2nd Level Accordion Group --> */}
                                </div>
                                {/* <!-- End 1st Level Collapse --> */}
                            </div>
                            {/* <!-- End 1st Level Accordion --> */}

                            {/* <!-- 1st Level Accordion --> */}
                            <div className="hs-accordion" role="treeitem" aria-expanded="false" id="hs-close-currently-opened-tree-heading-two">
                                {/* <!-- 1st Level Accordion Heading --> */}
                                <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-close-currently-opened-tree-collapse-two">
                                        <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                                        </svg>
                                    </button>

                                    <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                        <div className="flex items-center gap-x-3">
                                            <div className="grow">
                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                    Pádel
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End 1st Level Accordion Heading --> */}

                                {/* <!-- 1st Level Collapse --> */}
                                <div id="hs-close-currently-opened-tree-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-close-currently-opened-tree-heading-two">
                                    <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                        {/* <!-- 1st Level Item --> */}
                                        <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                            <div className="flex items-center gap-x-3">
                                                <div className="grow">
                                                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                        Alta Barda
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End 1st Level Item --> */}

                                        {/* <!-- 1st Level Item --> */}
                                        <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                            <div className="flex items-center gap-x-3">
                                                <div className="grow">
                                                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                        Biguá
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End 1st Level Item --> */}

                                        {/* <!-- 1st Level Item --> */}
                                        <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                            <div className="flex items-center gap-x-3">
                                                <div className="grow">
                                                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                        Winter
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End 1st Level Item --> */}
                                    </div>
                                </div>
                                {/* <!-- End 1st Level Collapse --> */}
                            </div>
                            {/* <!-- End 1st Level Accordion --> */}
                        </div>
                        {/* <!-- End 1st Level Accordion Group --> */}
                    </div>
                    {/* Vista de Árbol */}
                </div>
            </div>
        </div>
    )
}

export default PageHome;