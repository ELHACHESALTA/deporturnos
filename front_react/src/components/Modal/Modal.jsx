import React from 'react';


const Modal = ({ children, isOpen, closeModal }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    }

    return (
        <>
            <div className={`fixed z-50 top-0 left-0 w-full min-h-screen bg-lime-600 bg-opacity-50 dark:bg-lime-900 dark:bg-opacity-50 flex justify-center items-center ${isOpen ? 'flex' : 'hidden'}`}>
                <div className="flex items-center justify-center overflow-y-auto p-4 rounded-3xl bg-gray-200 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;