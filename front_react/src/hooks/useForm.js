import { useState } from "react";

const useForm = (initialForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value} = e.target;
        setForm({...form, [name]:value});
    }

    const handleRoleChange = (value) => {
        setForm({ ...form, idRol: value });
    };

    const handleDeporteChange = (value) => {
        setForm({ ...form, idDeporte: value });
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
    }

    return {
        form,
        errors,
        handleChange,
        resetForm,
        handleRoleChange,
        handleDeporteChange
    }
}

export default useForm;