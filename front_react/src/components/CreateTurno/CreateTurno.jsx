import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AuthUser from '../../pageauth/AuthUser'

const initialForm = {
    horarioInicio : "",
    horarioFin : "",
    precio : 0,
    timerReprogramacion : "",
};

const CreateTurno = ({ closeModal }) => {
  return (
    <div>CreateTurno</div>
  )
}

export default CreateTurno