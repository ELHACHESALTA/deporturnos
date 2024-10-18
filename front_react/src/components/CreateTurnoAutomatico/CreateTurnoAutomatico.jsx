import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import AuthUser from '../../pageauth/AuthUser';

const initialForm = {
    fechaInicioTurnos : "",
    fechaFinTurnos : "",
    precio : 0,
    timerReprogramacion : "",
}

const validationsForm = (form) => {
    let errors = {};

    let regexPrecio = /^\d+(\.\d+)?$/;
    let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let regexTiempo = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (form.precio === 0){
        errors.precio = "El campo 'precio' debe ser distinto de 0";
    } else if (!form.precio.toString().trim()){
        errors.precio = "El campo 'precio' es obligatorio";
    } else if (!regexPrecio.test(form.precio.toString().trim())){
        errors.precio = "El campo solo debe contener números";
    }

    if (!form.fechaInicioTurnos.trim()){
        errors.fechaInicioTurnos = "El campo 'fecha de inicio' es obligatorio";
    } else if (!regexFecha.test(form.fechaInicioTurnos.trim())){
        errors.fechaInicioTurnos = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    }

    if (!form.fechaFinTurnos.trim()){
        errors.fechaFinTurnos = "El campo 'fecha de fin' es obligatorio";
    } else if (!regexFecha.test(form.fechaFinTurnos.trim())){
        errors.fechaFinTurnos = "Debes ingresar una fecha. Ejemplo: 15-05-2024";
    }

    if (!form.timerReprogramacion.trim()){
        errors.timerReprogramacion = "Este campo es obligatorio";
    } else if (!regexTiempo.test(form.timerReprogramacion.trim())){
        errors.timerReprogramacion = "Debes ingresar una hora. Ejemplo: 15:30";
    }

    return errors;
  }
const CreateTurnoAutomatico = ({ closeModal, idCancha }) => {
    const {getUser, getToken} = AuthUser();
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
          await axios.post('http://localhost:8000/api/gestorComplejo/crearTurnoAutomatico', {idCancha, fechaInicioTurnos, fechaFinTurnos, precio, timerReprogramacion}, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ getToken()
              }
          }).then(({data})=> {
            if(data.success){
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
    <div>
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900">
                    Precio de los turnos:
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
            <div className='mb-5'>
              <label htmlFor="fechaInicioTurnos" className="block mb-2 text-sm font-medium text-gray-900">
                Fecha de inicio de generación de turnos:
              </label>
              <input name='fechaInicioTurnos'
                type="date"
                value={form.fechaInicioTurnos}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />     
            </div>
            <div>
                {errors.fechaInicioTurnos &&
                 <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span >{errors.fechaInicioTurnos}</span>
               </div>}
            </div>
            <div className='mb-5'>
              <label htmlFor="fechaFinTurnos" className="block mb-2 text-sm font-medium text-gray-900">
                Fecha de fin de generación de turnos:
              </label>
              <input name='fechaFinTurnos'
                type="date"
                value={form.fechaFinTurnos}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />     
            </div>
            <div>
                {errors.fechaFinTurnos &&
                 <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span >{errors.fechaFinTurnos}</span>
               </div>}
            </div>
            {/* Input para ingresar el tiempo para reprogramar los turnos */}
            <div className="mb-5">
                <label htmlFor="timerReprogramacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiempo para reprogramar los turnos:</label>
                <input type="time" value={form.timerReprogramacion} onChange={handleChange} name="timerReprogramacion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div>
                {errors.timerReprogramacion &&
                  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span >{errors.timerReprogramacion}</span>
                </div>}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={crearTurnosAutomaticos}
                >
                    Crear turnos
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 text-white border-none px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
  )
}

export default CreateTurnoAutomatico