import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import AuthUser from '../../pageauth/AuthUser';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { X } from 'lucide-react';

const validationsForm = (form) => {
    let errors = {};

    let regexPrecio = /^\d+(\.\d+)?$/;
    let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let regexTiempo = /^([01]\d|2[0-3]):([0-5]\d)$/;
    
    const nuevaFecha = new Date(form.fecha);
    const fechaActual = new Date();

    if (form.precio === 0) {
        errors.precio = "El campo 'precio' debe ser distinto de 0";
    } else if (!form.precio.toString().trim()) {
        errors.precio = "El campo 'precio' es obligatorio";
    } else if (!regexPrecio.test(form.precio.toString().trim())) {
        errors.precio = "El campo solo debe contener números";
    }

    if (!form.fecha.trim()) {
        errors.fecha = "El campo 'fecha' es obligatorio";
    } else if (!regexFecha.test(form.fecha.trim())) {
        errors.fecha = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    } else if (nuevaFecha < fechaActual){
        errors.fecha = "Debes ingresar una fecha posterior a la fecha actual.";
    }

    if (!form.horarioInicio.trim()) {
        errors.horarioInicio = "El campo 'Horario de inicio' es obligatorio";
    } else if (!regexTiempo.test(form.horarioInicio.trim())) {
        errors.horarioInicio = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    if (!form.horarioFin.trim()) {
        errors.horarioFin = "El campo 'Horario de Fin' es obligatorio";
    } else if (!regexTiempo.test(form.horarioFin.trim())) {
        errors.horarioFin = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    if (form.timerReprogramacion === 0) {
        errors.timerReprogramacion = "El campo 'tiempo para reprogramar' debe ser distinto de 0";
    } else if (!form.timerReprogramacion.toString().trim()) {
        errors.timerReprogramacion = "El campo 'tiempo para reprogramar' es obligatorio";
    } else if (!regexPrecio.test(form.timerReprogramacion.toString().trim())) {
        errors.timerReprogramacion = "El campo solo debe contener números";
    }

    return errors;
}

const EditTurno = ({ turno, closeModal, isOpen }) => {
    const emptyForm = {
        id: 0,
        fecha: '',
        horarioInicio: '',
        horarioFin: '',
        precio: 0,
        timerReprogramacion: 0,
    };

    const {
        form,
        handleChange,
        resetForm,
        setForm,
    } = useForm(emptyForm);

    // Actualiza el estado del formulario una vez que 'turno' tenga datos válidos
    useEffect(() => {
        if (turno && turno.id !== undefined) {
            const fechaYHorario = turno.horarioInicio;
            const datetime1 = new Date(fechaYHorario);
            const datetime2 = new Date(turno.horarioFin);
            const fecha = datetime1.toISOString().split('T')[0];
            const horaInicio = datetime1.toTimeString().split(' ')[0].substring(0, 5);
            const horaFin = datetime2.toTimeString().split(' ')[0].substring(0, 5);
            setForm({
                id: turno.id,
                fecha: fecha,
                horarioInicio: horaInicio,
                horarioFin: horaFin,
                precio: turno.precio,
                timerReprogramacion: turno.timerReprogramacion,
            });
        }
    }, [turno, setForm]);

    const id = form.id;
    const horarioInicio = form.fecha + " " + form.horarioInicio;
    const horarioFin = form.fecha + " " + form.horarioFin;
    const precio = form.precio;
    const timerReprogramacion = form.timerReprogramacion;

    const [errors, setErrors] = useState({});
    const { getToken } = AuthUser();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    const actualizarTurno = async (e) => {
        e.preventDefault();

        const validationErrors = validationsForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await axios.put('http://localhost:8000/api/gestorComplejo/editarTurno', { id, horarioInicio, horarioFin, precio, timerReprogramacion }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then(({ data }) => {
                if (data.success) {
                    resetForm();
                    console.log("editado exitosamente");
                    closeModal();
                    window.location.reload();
                }
            });
        }
    }

    const eliminarTurno = async (e) => {
        e.preventDefault();

        const id = turno.id;
        await axios.delete(`http://localhost:8000/api/gestorComplejo/eliminarTurno/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        }).then(({ data }) => {
            if (data.success) {
                closeModal();
                window.location.reload();
            } else {
                console.log(data.message);
            }
        });
    }


    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <form className="flex flex-col gap-y-4">
                <button type='button' className="absolute top-0 right-0" onClick={closeModal}>
                    <X className="size-7 dark:text-white" />
                </button>
                <label htmlFor="precio" className="text-sm font-medium text-center dark:text-white">
                    Precio del turno:
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
                <label htmlFor="fecha" className="text-sm font-medium text-center dark:text-white">
                    Fecha del turno:
                </label>
                <input name='fecha'
                    type="date"
                    value={form.fecha}
                    onChange={handleChange}
                    className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" />
                {errors.fecha &&
                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                        <span >{errors.fecha}</span>
                    </div>
                }
                {/* Input para ingresar la hora de inicio del turno */}
                <label htmlFor="horarioInicio" className="text-sm font-medium text-center dark:text-white">
                    Horario de Inicio:
                </label>
                <input
                    type="time"
                    value={form.horarioInicio}
                    onChange={handleChange}
                    name="horarioInicio"
                    className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                    required
                />
                {errors.horarioInicio &&
                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                        <span >{errors.horarioInicio}</span>
                    </div>
                }
                {/* Input para ingresar la hora de fin del turno */}
                <label htmlFor="horarioFin" className="text-sm font-medium text-center dark:text-white">
                    Horario de Fin:
                </label>
                <input
                    type="time"
                    value={form.horarioFin}
                    onChange={handleChange}
                    name="horarioFin"
                    className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                    required
                />
                {errors.horarioFin &&
                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                        <span >{errors.horarioFin}</span>
                    </div>
                }
                {/* Input para ingresar el tiempo para reprogramar el turno */}
                <label htmlFor="precio" className="text-sm font-medium text-center dark:text-white">
                    Tiempo mínimo para reprogramar los turnos:
                </label>
                <input
                    type="text"
                    name="timerReprogramacion"
                    value={form.timerReprogramacion}
                    onChange={handleChange}
                    className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                    required
                />
                {errors.timerReprogramacion &&
                    <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                        <span >{errors.timerReprogramacion}</span>
                    </div>
                }
                {/* Boton de Editar */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="py-2 px-6 rounded-2xl inline-flex justify-center items-center text-sm font-medium border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={actualizarTurno}
                    >
                        Guardar cambios
                    </button>
                </div>
                {/* Botón de Eliminar */}
                {!confirmDelete ? (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className="py-2 px-6 rounded-2xl inline-flex justify-center items-center text-sm font-medium border border-transparent bg-red-600 text-white dark:text-neutral-900 hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Eliminar turno
                        </button>
                    </div>
                ) : (
                    <>
                        <span className="text-sm font-medium text-center dark:text-white">¿Seguro que deseas eliminar el turno?</span>
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={eliminarTurno}
                                className="py-2 px-6 rounded-2xl inline-flex justify-center items-center text-sm font-medium border border-transparent bg-red-600 text-white dark:text-neutral-900 hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Sí, eliminar
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelDelete}
                                className="py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-gray-300 text-black hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                )}
            </form>
        </Modal>
    )
}

export default EditTurno