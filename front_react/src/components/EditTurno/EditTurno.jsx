import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../pageauth/AuthUser';
import axios from 'axios';
import Modal from '../Modal/Modal';

const validationsForm = (form) => {
    let errors = {};

    let regexPrecio = /^\d+(\.\d+)?$/;
    let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let regexTiempo = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (form.precio == 0){
        errors.precio = "El campo 'precio' debe ser distinto de 0";
    } else if (!form.precio.toString().trim()){
        errors.precio = "El campo 'precio' es obligatorio";
    } else if (!regexPrecio.test(form.precio.toString().trim())){
        errors.precio = "El campo solo debe contener números";
    }

    if (!form.fecha.trim()){
        errors.fecha = "El campo 'fecha' es obligatorio";
    } else if (!regexFecha.test(form.fecha.trim())){
        errors.fecha = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    }

    if (!form.horarioInicio.trim()){
        errors.horarioInicio = "El campo 'Horario de inicio' es obligatorio";
    } else if (!regexTiempo.test(form.horarioInicio.trim())){
        errors.horarioInicio = "Debes ingresar una hora. Ejemplo: 15:30";
    }  

    if (!form.horarioFin.trim()){
        errors.horarioFin = "El campo 'Horario de Fin' es obligatorio";
    } else if (!regexTiempo.test(form.horarioFin.trim())){
        errors.horarioFin = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    if (!form.timerReprogramacion.trim()){
        errors.timerReprogramacion = "Este campo es obligatorio";
    } else if (!regexTiempo.test(form.timerReprogramacion.trim())){
        errors.timerReprogramacion = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    return errors;
  }



const EditTurno = ({turno, closeModal, isOpen}) => {
    const emptyForm = {
        id: 0,
        fecha: '',
        horarioInicio: '',
        horarioFin: '',
        precio: 0,
        timerReprogramacion: '',
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
            timerReprogramacion: turno.timerReprogramacion.substring(0, 5),
          });
        }
    }, [turno, setForm]);

    const id = form.id;
    const horarioInicio = form.fecha + " " + form.horarioInicio;
    const horarioFin = form.fecha + " " + form.horarioFin;
    const precio = form.precio;
    const timerReprogramacion = form.timerReprogramacion;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { getToken, getUser } = AuthUser();
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

        if (Object.keys(validationErrors).length === 0){
            await axios.put('http://localhost:8000/api/gestorComplejo/editarTurno', {id, horarioInicio, horarioFin, precio, timerReprogramacion}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ getToken()
                }
            }).then(({data})=> {
                if(data.success){
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
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900">
                            Precio del turno:
                        </label>
                        <input
                            type="text"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                            required
                        />
                    </div>
                    <div>
                        {errors.precio &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{errors.precio}</span>
                    </div>}
                    </div>
                    <div>
                    <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900">
                        Fecha del turno:
                    </label>
                    <input name='fecha'
                        type="date"
                        value={form.fecha}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />     
                    </div>
                    <div>
                        {errors.fecha &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{errors.fecha}</span>
                        </div>}
                    </div>
                    {/* Input para ingresar la hora de inicio del turno */}
                    <div className="mb-5">
                        <label htmlFor="horarioInicio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Inicio:</label>
                        <input type="time" value={form.horarioInicio} onChange={handleChange} name="horarioInicio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        {errors.horarioInicio &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{errors.horarioInicio}</span>
                        </div>}
                    </div>
                    {/* Input para ingresar la hora de fin del turno */}
                    <div className="mb-5">
                        <label htmlFor="horarioFin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Fin:</label>
                        <input type="time" value={form.horarioFin} onChange={handleChange} name="horarioFin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        {errors.horarioFin &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{errors.horarioFin}</span>
                        </div>}
                    </div>
                    {/* Input para ingresar el tiempo para reprogramar el turno */}
                    <div className="mb-5">
                        <label htmlFor="timerReprogramacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiempo para reprogramar el turno:</label>
                        <input type="time" value={form.timerReprogramacion} onChange={handleChange} name="timerReprogramacion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        {errors.timerReprogramacion &&
                        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span >{errors.timerReprogramacion}</span>
                        </div>}
                    </div>
                    {/* Botones de Editar y Cancelar */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={actualizarTurno}
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    </div>

                    {/* Botón de Eliminar */}
                    {!confirmDelete ? (
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleDeleteClick}
                                className="py-3 px-4 justify-center inline-flex items-center gap-x-2 text- font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none w-full"
                            >
                                Eliminar turno
                            </button>
                        </div>
                    ) : (
                        <div className="mt-6 flex flex-col items-center gap-y-2">
                            <span className="text-sm text-gray-800">¿Seguro que deseas eliminar el turno?</span>
                            <div className="flex gap-x-2">
                                <button
                                    type="button"
                                    onClick={eliminarTurno}
                                    className="py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Sí, eliminar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelDelete}
                                    className="py-2 px-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </Modal>
        </div>
    )
}

export default EditTurno