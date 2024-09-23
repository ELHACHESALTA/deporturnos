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
    let regexCalle = /^[A-Za-zÁ-Ýá-ýñÑ’']([A-Za-zÁ-Ýá-ýñÑ’' ]*)$/;
    let regexNumero = /^[0-9]+$/;
    let regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    


    if (!form.nombreComplejo.trim()){
        errors.nombreComplejo = "El campo 'nombre del complejo' es obligatorio";
    } else if (!regexNombreComplejo.test(form.nombreComplejo.trim())){
        errors.nombreComplejo = "El campo debe contener sólo letras, números o espacios en blanco";
    }

    if (!form.ciudad.trim()){
        errors.ciudad = "El campo 'ciudad' es obligatorio";
    } else if (!regexCiudad.test(form.ciudad.trim())){
        errors.ciudad = "El campo 'ciudad' solo debe contener letras y espacios en blanco";
    }

    if (!form.calle.trim() || !form.numero.trim()){
        errors.calle = "Los campos 'calle' y 'N°' son obligatorios";
    } else if (!regexCalle.test(form.calle.trim())){
        errors.calle = "El campo 'calle' sólo acepta letras y espacios en blanco";
    } else if (!regexNumero.test(form.numero.trim())){
      errors.calle = "El campo 'número' sólo acepta números";
    }

    if (!form.diasDisponibles.trim()){
      errors.diasDisponibles = "El campo 'dias disponibles' es obligatorio";
    } else if (!regexNombreComplejo.test(form.diasDisponibles.trim())){
      errors.diasDisponibles = "El campo 'dias disponibles' sólo acepta letras y espacios en blanco";
    }

    if (!form.horaApertura.trim()){
      errors.horaApertura = "El campo 'Hora de Apertura' es obligatorio";
    } else if (!regexHora.test(form.horaApertura.trim())){
      errors.horaApertura = "El campo 'Hora de Apertura' solo acepta horas y minutos.";
    }

    if (!form.horaCierre.trim()){
      errors.horaCierre = "El campo 'Hora de Cierre' es obligatorio";
    } else if (!regexHora.test(form.horaCierre.trim())){
      errors.horaCierre = "El campo 'Hora de Cierre' solo acepta horas y minutos.";
    }

    return errors;
}

const EditComplejo = ({complejo}) => {
  const cadena = complejo[0].ubicacion;
  const partes = cadena.match(/^([a-zA-ZÀ-ÿ\u00f1\u00d1\s]+)(\d+)$/);
  const calle = partes[1].trim();
  const numero = partes[2];

  const initialForm = {
    nombreComplejo: complejo[0].nombreComplejo,
    ciudad: complejo[0].ciudad,
    calle: calle,
    numero: numero,
    diasDisponibles: complejo[0].diasDisponibles,
    horaApertura: complejo[0].horaApertura.slice(0, -3),
    horaCierre: complejo[0].horaCierre.slice(0, -3),
  };
  
  const {
    form,
    handleChange,
    resetForm,
   } = useForm(initialForm); 
   
   const nombreComplejo = form.nombreComplejo;
   const ciudad = form.ciudad;
   const ubicacion = form.calle + " " + form.numero;
   const diasDisponibles = form.diasDisponibles;
   const horaApertura = form.horaApertura;
   const horaCierre = form.horaCierre;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { getToken, getUser } = AuthUser();
    const endpoint = 'http://localhost:8000/api/gestorComplejo/editarComplejo';

    const idUser = getUser().id;

    const actualizarComplejo = async (e) => {
      e.preventDefault();
      const validationErrors = validationsForm(form);
      setErrors(validationErrors);
    
      if (Object.keys(validationErrors).length === 0){
        await axios.put(endpoint, {nombreComplejo, ciudad, ubicacion, diasDisponibles, horaApertura, horaCierre, idUser}, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ getToken()
          }
      }).then(({data})=> {
          if(data.success){
              resetForm();
              console.log("complejo actualizado correctamente");
              window.location.reload();
          } else {
            console.log(data.error);
            console.log("no se pudo actualizar el complejo");
          }
        });
      }
     }

  return (
    <div>
      <h1 className="text-center text-blue-800">EDITAR COMPLEJO</h1>
      <form className="max-w-sm mx-auto">
        {/* Input para ingresar el nombre del complejo */}
        <div className="mb-2">
            <label htmlFor="nombreComplejo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Complejo</label>
            <input type="text" value={form.nombreComplejo} onChange={handleChange} name="nombreComplejo" placeholder='Nombre' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
            {errors.nombreComplejo &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.nombreComplejo}</span>
            </div>}
        </div>
        {/* Input para ingresar la ciudad donde se encuentra el complejo */}
        <div className="mb-5">
            <label htmlFor="ciudad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
            <input type="text" value={form.ciudad} onChange={handleChange} name="ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ciudad" required />
        </div>
        <div>
            {errors.ciudad &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.ciudad}</span>
            </div>}
        </div>
        {/* Input para ingresar dirección del complejo */}
        <div className="mb-5 flex space-x-4">
          <div className="w-3/4">
              <label htmlFor="calle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle:</label>
              <input type="text" value={form.calle} onChange={handleChange} name="calle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Calle" required />
          </div>
          <div className="w-1/4">
              <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">N°:</label>
              <input type="number" value={form.numero} onChange={handleChange} name="numero" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="N°" required />
          </div>
      </div>
      <div>
            {errors.calle &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.calle}</span>
            </div>}
        </div>
        {/* Input para ingresar los dias de la semana disponibles del complejo */}
        <div className="mb-5">
            <label htmlFor="diasDisponibles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dias Disponibles:</label>
            <input type="text" value={form.diasDisponibles} onChange={handleChange} name="diasDisponibles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Días Disponibles" required />
        </div>
        <div>
            {errors.diasDisponibles &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.diasDisponibles}</span>
            </div>}
        </div>
        {/* Input para ingresar la hora de apertura del complejo */}
        <div className="mb-5">
            <label htmlFor="horaApertura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Apertura:</label>
            <input type="time" value={form.horaApertura} onChange={handleChange} name="horaApertura" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
            {errors.horaApertura &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.horaApertura}</span>
            </div>}
        </div>
        {/* Input para ingresar la hora de cierre del complejo */}
        <div className="mb-5">
            <label htmlFor="horaCierre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Cierre:</label>
            <input type="time" value={form.horaCierre} onChange={handleChange} name="horaCierre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
            {errors.horaCierre &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span >{errors.horaCierre}</span>
            </div>}
        </div>
        <button onClick={actualizarComplejo} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
      </form>
    </div>
  )
}

export default EditComplejo