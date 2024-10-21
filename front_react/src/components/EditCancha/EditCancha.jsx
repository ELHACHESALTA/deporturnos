import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../pageauth/AuthUser';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { X } from 'lucide-react';

const validationsForm = (form) => {
    let errors = {};

    const regexNombreCancha = /^[a-zA-Z0-9 ]*$/;

    if (!form.nombreCancha.trim()) {
        errors.nombreCancha = "El campo 'nombre de la cancha' es obligatorio";
    } else if (!regexNombreCancha.test(form.nombreCancha.trim())) {
        errors.nombreCancha = "El campo solo acepta números, letras y espacios en blanco";
    }

    if (form.idDeporte === 0) {
        errors.idDeporte = "Debes seleccionar algún deporte";
    }
    return errors;
}

const EditCancha = ({ cancha, closeModal, isOpen }) => {
    const emptyForm = {
        id: 0,
        nombreCancha: '',
        idDeporte: 0,
        idComplejo: 0,
    };

    const {
        form,
        handleChange,
        resetForm,
        handleDeporteChange,
        setForm,
    } = useForm(emptyForm);

    // Actualizar el estado del formulario una vez que 'cancha' tenga datos válidos
    useEffect(() => {
        if (cancha && cancha.id !== undefined) {
            setForm({
                id: cancha.id,
                nombreCancha: cancha.nombreCancha,
                idDeporte: cancha.idDeporte,
                idComplejo: cancha.idComplejo,
            });
        }
    }, [cancha, setForm]);

    const id = form.id;
    const nombreCancha = form.nombreCancha;
    const idDeporte = form.idDeporte;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { getToken, getUser } = AuthUser();

    // para la seleccion del deporte
    const [selectedDeporte, setSelectedDeporte] = useState(form.idDeporte);
    const [subOpcionesFutbol, setSubOpcionesFutbol] = useState(null);

    useEffect(() => {
        if (form.idDeporte === 0) {
            setSelectedDeporte(0);
            setSubOpcionesFutbol(['Fútbol 5', 'Fútbol 8', 'Fútbol 11']);
        } else if (form.idDeporte === 4) {
            setSelectedDeporte(4);
            setSubOpcionesFutbol(null);
        }
    }, [form.idDeporte]);

    const handleDeporteClick = (deporte) => {
        setSelectedDeporte(deporte);
        if (deporte === 0) {
            handleDeporteChange(0);
            setSubOpcionesFutbol(['Fútbol 5', 'Fútbol 8', 'Fútbol 11']);
        } else {
            setSubOpcionesFutbol(null);
            handleDeporteChange(4);
        }
    };

    const actualizarCancha = async (e) => {
        e.preventDefault();

        const validationErrors = validationsForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await axios.put('http://localhost:8000/api/gestorComplejo/editarCancha', { id, nombreCancha, idDeporte }, {
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

    const handleCloseModal = () => {
        resetForm();
        setSelectedDeporte(form.idDeporte);
        setSubOpcionesFutbol(form.idDeporte === 0 ? ['Fútbol 5', 'Fútbol 8', 'Fútbol 11'] : null);
        closeModal();
    };

    return (
        <>
            <Modal isOpen={isOpen} closeModal={handleCloseModal}>
                <form className="flex flex-col gap-y-4">
                    <button type='button' className="absolute top-0 right-0" onClick={closeModal}>
                        <X className="size-7 dark:text-white" />
                    </button>
                    <label htmlFor="nombreCancha" className="text-sm font-medium text-center dark:text-white">
                        Nombre de la cancha:
                    </label>
                    <input
                        type="text"
                        name="nombreCancha"
                        value={form.nombreCancha}
                        onChange={handleChange}
                        className="py-2 px-4 block w-full bg-white border border-gray-300 text-gray-900 rounded-2xl text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                        required
                    />
                    {errors.nombreCancha &&
                        <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                            <span >{errors.nombreCancha}</span>
                        </div>
                    }
                    <div className="text-sm font-medium text-center dark:text-white">Seleccione un deporte:</div>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => handleDeporteClick(0)}
                            className={`py-2 px-6 rounded-2xl ${selectedDeporte === 0 ? 'bg-lime-600 text-white dark:text-neutral-900 text-sm font-medium' : 'text-sm font-medium bg-white text-neutral-900 hover:bg-gray-100 dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-950'
                                }`}
                        >
                            Fútbol
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDeporteClick(4)}
                            className={`py-2 px-6 rounded-2xl ${selectedDeporte === 4 ? 'bg-lime-600 text-white dark:text-neutral-900 text-sm font-medium' : 'text-sm font-medium bg-white text-neutral-900 hover:bg-gray-100 dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-950'
                                }`}
                        >
                            Pádel
                        </button>
                    </div>
                    {subOpcionesFutbol && (
                        <>
                            <div className="text-sm font-medium text-center dark:text-white">Seleccione una opción de fútbol:</div>
                            <div className="flex flex-row gap-4 justify-center items-start">
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
                                            className="py-2 px-6 rounded-2xl flex items-center justify-between w-full text-sm font-medium bg-white border border-transparent border-lime-600 cursor-pointer dark:text-white focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none hover:bg-lime-700 dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-neutral-900 peer-checked:border-lime-600 peer-checked:bg-lime-600 peer-checked:text-white hover:text-white dark:bg-neutral-900 dark:hover:bg-neutral-950"
                                        >
                                            <div className="block">
                                                <div className="">{opcion}</div> {/* Mantenido a text-lg */}
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </div>
                        </>
                    )}
                    {errors.idDeporte &&
                        <div className="p-2 text-sm text-red-800 rounded-2xl bg-red-100 dark:bg-red-300 dark:text-black" role="alert">
                            <span >{errors.idDeporte}</span>
                        </div>
                    }
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="py-2 px-6 rounded-2xl inline-flex justify-center items-center text-sm font-medium border border-transparent bg-lime-600 text-white dark:text-neutral-900 hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={actualizarCancha}
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditCancha