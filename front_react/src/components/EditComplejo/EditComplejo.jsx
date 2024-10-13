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
        errors.calle = "El campo 'calle' sólo acepta letras, números y espacios en blanco";
    } else if (!regexNumero.test(form.numero.trim())){
      errors.calle = "El campo 'número' sólo acepta números";
    }
    return errors;
}

const EditComplejo = ({complejo, diasDisponibles, servicios, serviciosSeleccionados}) => {
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

  console.log(serviciosEstado);
  
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
    
      if (Object.keys(validationErrors).length === 0){
        await axios.put(endpoint, {nombreComplejo, ciudad, ubicacion, diasConfiguracion, serviciosEstado, idUser}, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ getToken()
          }
      }).then(({data})=> {
          if(data.success){
            resetForm();
            window.location.reload();
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
        {/* Configuración de días de apertura y cierre */}
        <div className="flex flex-wrap justify-center gap-4">
          <h2 className="text-xl font-semibold text-black mb-4">Configura los Horarios para Cada Día</h2>
          {diasSemana.map((dia) => (
            <div
              key={dia}
              className="relative block p-4 max-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <h3 className="text-base font-medium text-gray-900">{dia}</h3>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={diasConfiguracion[dia].abierto}
                  onChange={(e) => handleAbiertoChange(dia, e)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">¿Abierto?</span>
              </label>

              {diasConfiguracion[dia].abierto && (
                <div className="mt-3">
                  <label htmlFor={`apertura-${dia}`} className="block text-xs font-medium text-gray-700">
                    Horario de Apertura:
                  </label>
                  <input
                    type="time"
                    id={`apertura-${dia}`}
                    value={diasConfiguracion[dia].apertura}
                    onChange={(e) => handleHorarioChange(dia, "apertura", e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />

                  <label htmlFor={`cierre-${dia}`} className="block mt-2 text-xs font-medium text-gray-700">
                    Horario de Cierre:
                  </label>
                  <input
                    type="time"
                    id={`cierre-${dia}`}
                    value={diasConfiguracion[dia].cierre}
                    onChange={(e) => handleHorarioChange(dia, "cierre", e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
              )}
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-4 text-black">Resumen de Horarios:</h3>
          <ul className="list-disc pl-6 mt-2 text-black">
            {diasSemana.map((dia) => (
              <li key={dia}>
                {dia}: {diasConfiguracion[dia].abierto ? `Abierto de ${diasConfiguracion[dia].apertura} a ${diasConfiguracion[dia].cierre}` : "Cerrado"}
              </li>
            ))}
          </ul>
        </div>
        {/* Fin de configuración de días */}

        {/* Selección de servicios */}
        <div className='text-black'>
          <h2 className='text-xl font-semibold text-black mb-4 mt-6' >Selecciona los servicios adicionales</h2>
          {serviciosEstado.map((servicio, index) => (
            <div key={servicio.id}>
              <input
                type="checkbox"
                checked={servicio.seleccionado}
                onChange={() => handleChangeServiciosSeleccionados(index)}
              />
              <label>{servicio.descripcionServicio}</label>
            </div>
          ))}
        </div>
        {/* Fin de selección de servicios */}
        <button onClick={actualizarComplejo} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
      </form>
    </div>
  )
}

export default EditComplejo