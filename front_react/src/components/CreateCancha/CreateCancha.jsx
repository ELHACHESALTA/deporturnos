import React, { useState } from 'react'
import useForm from '../../hooks/useForm';
import AuthUser from '../../pageauth/AuthUser';
import axios from 'axios';

const initialForm = {
    nombreCancha : "",
    idDeporte : 0,
}

const validationsForm = (form) => {
    let errors = {};

    const regexNombreCancha = /^[a-zA-Z0-9 ]*$/;

    if (!form.nombreCancha.trim()){
        errors.nombreCancha = "El campo 'nombre de la cancha' es obligatorio";
    } else if (!regexNombreCancha.test(form.nombreCancha.trim())){
        errors.nombreCancha = "El campo solo acepta números, letras y espacios en blanco";
    }

    if (form.idDeporte === 0){
        errors.idDeporte = "Debes seleccionar algún deporte";
    }
    return errors;
}

const CreateCancha = ({ closeModal }) => {
    const {getUser, getToken} = AuthUser();
    const idUser = getUser().id;
    const [errors, setErrors] = useState({});
    const {
        form,
        handleChange,
        handleDeporteChange,
        resetForm,
    } = useForm(initialForm);

    // variables que irán al formulario
    const nombreCancha = form.nombreCancha;
    const idDeporte = form.idDeporte;

    // para la seleccion del deporte
    const [selectedDeporte, setSelectedDeporte] = useState(null);
    const [subOpcionesFutbol, setSubOpcionesFutbol] = useState(null);

    const handleDeporteClick = (deporte) => {
        setSelectedDeporte(deporte);
        if (deporte === 'Fútbol') {
            handleDeporteChange(0);
            setSubOpcionesFutbol(['Fútbol 5', 'Fútbol 8', 'Fútbol 11']);
        } else {
            setSubOpcionesFutbol(null);
            handleDeporteChange(4);
        }
    };


    const submitCancha = async (e) => {
        e.preventDefault();
        const validationErrors = validationsForm(form);
        setErrors(validationErrors);

        // Solo procede con el envío si no hay errores y se ha seleccionado un rol válido    
        if (Object.keys(validationErrors).length === 0) {
            await axios.post('http://localhost:8000/api/gestorComplejo/crearCancha', {nombreCancha, idDeporte, idUser}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ getToken()
                }
            }).then(({data})=> {
                if(data.success){
                    resetForm();
                    console.log("creado exitosamente");
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
        <div>Create cancha</div>
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <label htmlFor="nombreCancha" className="block mb-2 text-sm font-medium text-gray-900">
                    Nombre de la cancha:
                </label>
                <input
                    type="text"
                    name="nombreCancha"
                    value={form.nombreCancha}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                />
            </div>
            <div>
                {errors.nombreCancha &&
                 <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span >{errors.nombreCancha}</span>
               </div>}
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Seleccione un deporte</h2>
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => handleDeporteClick('Fútbol')}
                        className={`px-4 py-3 rounded-lg shadow-md transition-colors duration-300 ${
                            selectedDeporte === 'Fútbol' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        Fútbol
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeporteClick('Pádel')}
                        className={`px-4 py-3 rounded-lg shadow-md transition-colors duration-300 ${
                            selectedDeporte === 'Pádel' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        Pádel
                    </button>
                </div>
            </div>

            {subOpcionesFutbol && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-800">Seleccione una opción de fútbol</h3>
                    <div className="flex flex-col gap-4 justify-center items-start">
                        {subOpcionesFutbol.map((opcion, index) => (
                            <li key={index} className="list-none">
                                <input
                                    type="radio"
                                    id={`futbol-${opcion}`}
                                    name="opcionFutbol"
                                    value={opcion}
                                    className="hidden peer"
                                    onChange={() => handleDeporteChange(index + 1)}
                                    checked={form.idDeporte === index + 1}
                                />
                                <label
                                    htmlFor={`futbol-${opcion}`}
                                    className="flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{opcion}</div> {/* Mantenido a text-lg */}
                                    </div>
                                </label>
                            </li>
                        ))}
                    </div>
                </div>
            )}
            <div>
                {errors.idDeporte &&
                 <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span >{errors.idDeporte}</span>
               </div>}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={submitCancha}
                >
                    Crear
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

export default CreateCancha