import React from 'react';

const Modal = ({ children, isOpen, closeModal }) => {
    return (
        <>
            <div className={`fixed z-50 top-0 left-0 w-full min-h-screen bg-lime-600 bg-opacity-50 dark:bg-lime-900 dark:bg-opacity-50 flex justify-center items-center ${isOpen ? 'flex' : 'hidden'}`}>
                <div className="flex items-center justify-center w-auto p-4 rounded-3xl bg-gray-200 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
                    <div className="relative max-h-[80vh] overflow-y-auto w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;