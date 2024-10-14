import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import AuthUser from '../../pageauth/AuthUser';
import { useNavigate } from 'react-router-dom';


const validationsForm = (form) => {
    let errors = {};

    // expresiones regulares para los distintos campos del formulario
    let regexNombreComplejo = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s'"]+$/;
    let regexCiudad = /^[A-Za-zÁ-Ýá-ýñÑ’']([A-Za-zÁ-Ýá-ýñÑ’' ]*)$/;
    let regexCalle = /^[A-Za-zÁ-Ýá-ýñÑ’'0-9]([A-Za-zÁ-Ýá-ýñÑ’'0-9 ]*)$/;
    let regexNumero = /^[0-9]+$/;
    let regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;



    if (!form.nombreComplejo.trim()) {
        errors.nombreComplejo = "El campo 'nombre del complejo' es obligatorio";
    } else if (!regexNombreComplejo.test(form.nombreComplejo.trim())) {
        errors.nombreComplejo = "El campo debe contener sólo letras, números o espacios en blanco";
    }

    if (!form.ciudad.trim()) {
        errors.ciudad = "El campo 'ciudad' es obligatorio";
    } else if (!regexCiudad.test(form.ciudad.trim())) {
        errors.ciudad = "El campo 'ciudad' solo debe contener letras y espacios en blanco";
    }

    if (!form.calle.trim() || !form.numero.trim()) {
        errors.calle = "Los campos 'calle' y 'N°' son obligatorios";
    } else if (!regexCalle.test(form.calle.trim())) {
        errors.calle = "El campo 'calle' sólo acepta letras, números y espacios en blanco";
    } else if (!regexNumero.test(form.numero.trim())) {
        errors.calle = "El campo 'número' sólo acepta números";
    }
    return errors;
}

const EditComplejo = ({ complejo, diasDisponibles, servicios, serviciosSeleccionados }) => {
    const cadena = complejo[0].ubicacion;
    const partes = cadena.match(/^(.*?)(\d+)(?!.*\d)/);
    const calle = partes[1].trim();
    const numero = partes[2];
    const initialForm = {
        nombreComplejo: complejo[0].nombreComplejo,
        ciudad: complejo[0].ciudad,
        calle: calle,
        numero: numero,
    };

    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    // Estado para guardar la disponibilidad y los horarios seleccionados para cada día
    const [diasConfiguracion, setDiasConfiguracion] = useState(
        diasSemana.reduce((acc, dia) => {
            const diaDisponible = diasDisponibles.find(d => d.dia === dia);

            // Si el día está en diasDisponibles, carga sus horarios
            if (diaDisponible) {
                acc[dia] = {
                    abierto: true, // Si hay horarios, asumimos que está abierto
                    apertura: diaDisponible.horaApertura,
                    cierre: diaDisponible.horaCierre,
                };
            } else {
                // Si no está en diasDisponibles, lo dejamos como cerrado
                acc[dia] = {
                    abierto: false,
                    apertura: "10:00",
                    cierre: "17:00",
                };
            }

            return acc;
        }, {}));

    // Maneja el cambio de si el complejo está abierto o cerrado
    const handleAbiertoChange = (dia, e) => {
        setDiasConfiguracion({
            ...diasConfiguracion,
            [dia]: { ...diasConfiguracion[dia], abierto: e.target.checked },
        });
    };

    // Maneja el cambio del horario de apertura o cierre
    const handleHorarioChange = (dia, tipo, e) => {
        setDiasConfiguracion({
            ...diasConfiguracion,
            [dia]: { ...diasConfiguracion[dia], [tipo]: e.target.value },
        });
    };

    const [serviciosEstado, setServiciosEstado] = useState([]);
    useEffect(() => {
        // Crear un nuevo array con la propiedad "seleccionado" basada en los serviciosSeleccionados
        const serviciosConSeleccion = servicios.map(servicio => ({
            ...servicio,
            seleccionado: serviciosSeleccionados.some(sel => sel.idServicio === servicio.id),
        }));

        setServiciosEstado(serviciosConSeleccion);
    }, [servicios, serviciosSeleccionados]);

    const handleChangeServiciosSeleccionados = (index) => {
        // Actualizar el estado cuando se seleccione o deseleccione un servicio
        const nuevosServicios = [...serviciosEstado];
        nuevosServicios[index].seleccionado = !nuevosServicios[index].seleccionado;
        setServiciosEstado(nuevosServicios);
    };

    // console.log(serviciosEstado);

    const {
        form,
        handleChange,
        resetForm,
    } = useForm(initialForm);

    const nombreComplejo = form.nombreComplejo;
    const ciudad = form.ciudad;
    const ubicacion = form.calle + " " + form.numero;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { getToken, getUser } = AuthUser();
    const endpoint = 'http://localhost:8000/api/gestorComplejo/editarComplejo';

    const idUser = getUser().id;

    const actualizarComplejo = async (e) => {
        e.preventDefault();
        const validationErrors = validationsForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await axios.put(endpoint, { nombreComplejo, ciudad, ubicacion, diasConfiguracion, serviciosEstado, idUser }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then(({ data }) => {
                if (data.success) {
                    resetForm();
                    window.location.reload();
                }
            });
        }
    }

    return (
        <div>
            <div className="mt-4">
                <form className="flex mx-auto max-w-[66rem] px-2 flex-col">
                    <div className="flex flex-row w-full mb-3">
                        {/* Input para ingresar el nombre del complejo */}
                        <div className="basis-1/3 px-2">
                            <div className="mb-2">
                                <label htmlFor="nombreComplejo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Complejo</label>
                                <input type="text" value={form.nombreComplejo} onChange={handleChange} name="nombreComplejo" placeholder='Nombre' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" required />
                            </div>
                            <div>
                                {errors.nombreComplejo &&
                                    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span >{errors.nombreComplejo}</span>
                                    </div>}
                            </div>
                        </div>
                        <div className="basis-1/3 px-2">
                            {/* Input para ingresar la ciudad donde se encuentra el complejo */}
                            <div className="basis-full">
                                <label htmlFor="ciudad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                                <input type="text" value={form.ciudad} onChange={handleChange} name="ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Ciudad" required />
                            </div>
                            <div>
                                {errors.ciudad &&
                                    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span >{errors.ciudad}</span>
                                    </div>}
                            </div>
                        </div>
                        <div className="basis-1/3 px-2">
                            {/* Input para ingresar dirección del complejo */}
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="calle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle:</label>
                                    <input type="text" value={form.calle} onChange={handleChange} name="calle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Calle" required />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">N°:</label>
                                    <input type="number" value={form.numero} onChange={handleChange} name="numero" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="N°" required />
                                </div>
                            </div>
                            <div>
                                {errors.calle &&
                                    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span >{errors.calle}</span>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full mb-4 justify-center">
                        {/* Configuración de días de apertura y cierre */}
                        <div className="basis-1/2 px-2">
                            <div className="flex-col">
                                <div className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Configura los Horarios para Cada Día</div>
                                {diasSemana.map((dia) => (
                                    <div
                                        key={dia}
                                        className="flex flex-row mb-1 w-full p-2 bg-white  border border-gray-200 rounded-lg shadow-sm dark:bg-neutral-700 dark:border-neutral-600"
                                    >
                                        <div className="basis-1/6 flex items-center justify-center text-base font-medium text-gray-900 dark:text-white">{dia}</div>
                                        <div className="basis-1/6 flex items-center justify-center mx-4">
                                            <input
                                                type="checkbox"
                                                checked={diasConfiguracion[dia].abierto}
                                                onChange={(e) => handleAbiertoChange(dia, e)}
                                                className="form-checkbox h-4 w-4 text-lime-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-white">¿Abierto?</span>
                                        </div>

                                        {diasConfiguracion[dia].abierto && (
                                            <div className="basis-4/6">
                                                <div className="flex flex-row">
                                                    <div className="basis-1/2 mr-4 flex flex-col justify-center">
                                                        <label htmlFor={`apertura-${dia}`} className="block text-xs font-medium text-gray-700 dark:text-white">
                                                            Horario de Apertura:
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id={`apertura-${dia}`}
                                                            value={diasConfiguracion[dia].apertura}
                                                            onChange={(e) => handleHorarioChange(dia, "apertura", e)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max mx-auto p-1"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="basis-1/2 flex flex-col justify-center">
                                                        <label htmlFor={`cierre-${dia}`} className="block text-xs font-medium text-gray-700 dark:text-white">
                                                            Horario de Cierre:
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id={`cierre-${dia}`}
                                                            value={diasConfiguracion[dia].cierre}
                                                            onChange={(e) => handleHorarioChange(dia, "cierre", e)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max mx-auto p-1"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="basis-2/6 px-2">
                            <div>
                                <div className='mb-8'>
                                    <h3 className="block mb-4 text-sm font-bold text-gray-900 dark:text-white">Resumen de Horarios:</h3>
                                    <ul className="list-disc pl-6 mt-2 block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                                        {diasSemana.map((dia) => (
                                            <li key={dia}>
                                                <div className="flex flex-row gap-1">
                                                    <div className="font-bold">{dia}: </div>
                                                    <div className="">
                                                        {diasConfiguracion[dia].abierto ? `Abierto de ${diasConfiguracion[dia].apertura} a ${diasConfiguracion[dia].cierre}` : "Cerrado"}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Selección de servicios */}
                                <div className='block text-sm font-medium text-gray-900 dark:text-white text-start'>
                                    <h2 className='mb-4 text-sm font-bold text-gray-900 dark:text-white flex justify-center' >Selecciona los servicios adicionales</h2>
                                    {serviciosEstado.map((servicio, index) => (
                                        <div key={servicio.id}>
                                            <input
                                                type="checkbox"
                                                checked={servicio.seleccionado}
                                                onChange={() => handleChangeServiciosSeleccionados(index)}
                                                className='ml-1'
                                            />
                                            <label className='ml-2'>{servicio.descripcionServicio}</label>
                                        </div>
                                    ))}
                                </div>
                                {/* Fin de selección de servicios */}
                            </div>
                            <button onClick={actualizarComplejo} className="mt-4 text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full mx-auto sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Guardar</button>
                        </div>
                    </div>
                    {/* Fin de configuración de días */}


                </form>
            </div>
        </div >
    )
}

export default EditComplejo