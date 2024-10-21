import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import AuthUser from '../../pageauth/AuthUser';
import { X } from 'lucide-react';

const initialForm = {
    fechaInicioTurnos: "",
    fechaFinTurnos: "",
    precio: 0,
    timerReprogramacion: "",
}

const validationsForm = (form) => {
    let errors = {};

    let regexPrecio = /^\d+(\.\d+)?$/;
    let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let regexTiempo = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (form.precio === 0) {
        errors.precio = "El campo 'precio' debe ser distinto de 0";
    } else if (!form.precio.toString().trim()) {
        errors.precio = "El campo 'precio' es obligatorio";
    } else if (!regexPrecio.test(form.precio.toString().trim())) {
        errors.precio = "El campo solo debe contener números";
    }

    if (!form.fechaInicioTurnos.trim()) {
        errors.fechaInicioTurnos = "El campo 'fecha de inicio' es obligatorio";
    } else if (!regexFecha.test(form.fechaInicioTurnos.trim())) {
        errors.fechaInicioTurnos = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    }

    if (!form.fechaFinTurnos.trim()) {
        errors.fechaFinTurnos = "El campo 'fecha de fin' es obligatorio";
    } else if (!regexFecha.test(form.fechaFinTurnos.trim())) {
        errors.fechaFinTurnos = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    }

    if (!form.timerReprogramacion.trim()) {
        errors.timerReprogramacion = "Este campo es obligatorio";
    } else if (!regexTiempo.test(form.timerReprogramacion.trim())) {
        errors.timerReprogramacion = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    return errors;
}
const CreateTurnoAutomatico = ({ closeModal, idCancha }) => {
    const { getUser, getToken } = AuthUser();
    const [errors, setErrors] = useState({});
    const {
        form,
        handleChange,
        resetForm,
    } = useForm(initialForm);

    // variables que irán al formulario
    const fechaInicioTurnos = form.fechaInicioTurnos;
    const fechaFinTurnos = form.fechaFinTurnos;
    const precio = form.precio;
    const timerReprogramacion = form.timerReprogramacion + ":00";

    const crearTurnosAutomaticos = async (e) => {
        e.preventDefault();

        const validationErrors = validationsForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await axios.post('http://localhost:8000/api/gestorComplejo/crearTurnoAutomatico', { idCancha, fechaInicioTurnos, fechaFinTurnos, precio, timerReprogramacion }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then(({ data }) => {
                if (data.success) {
                    resetForm();
                    console.log("los turnos se crearon exitosamente");
                    closeModal();
                    window.location.reload();
                } else {
                    console.log(data.error);
                }
            });
        }
    }
    return (
        <form className="flex flex-col gap-y-4">
            <button className="absolute top-0 right-0" onClick={closeModal}>
                <X className="size-7 dark:text-white" />
            </button>
            <label htmlFor="precio" className="text-sm font-medium text-center dark:text-white">
                Precio de los turnos:
            </label>
            <input
                type="text"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                required
            />
            {errors.precio &&
                <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                    <span >{errors.precio}</span>
                </div>
            }
            <label htmlFor="fechaInicioTurnos" className="text-sm font-medium text-center dark:text-white">
                Fecha de inicio de generación de turnos:
            </label>
            <input name='fechaInicioTurnos'
                type="date"
                value={form.fechaInicioTurnos}
                onChange={handleChange}
                className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" />
            {errors.fechaInicioTurnos &&
                <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                    <span >{errors.fechaInicioTurnos}</span>
                </div>
            }
            <label htmlFor="fechaFinTurnos" className="text-sm font-medium text-center dark:text-white">
                Fecha de fin de generación de turnos:
            </label>
            <input name='fechaFinTurnos'
                type="date"
                value={form.fechaFinTurnos}
                onChange={handleChange}
                className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" />
            {errors.fechaFinTurnos &&
                <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                    <span >{errors.fechaFinTurnos}</span>
                </div>
            }
            {/* Input para ingresar el tiempo para reprogramar los turnos */}
            <label htmlFor="timerReprogramacion" className="text-sm font-medium text-center dark:text-white">
                Tiempo para reprogramar los turnos:
            </label>
            <input
                type="time"
                value={form.timerReprogramacion}
                onChange={handleChange}
                name="timerReprogramacion"
                className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                required
            />
            {errors.timerReprogramacion &&
                <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                    <span >{errors.timerReprogramacion}</span>
                </div>
            }
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="py-2 px-6 rounded-2xl inline-flex justify-center items-center text-sm font-medium border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={crearTurnosAutomaticos}
                >
                    Crear turnos automáticos
                </button>
            </div>
        </form>
    )
}

export default CreateTurnoAutomatico