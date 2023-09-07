import { useCallback, useState } from 'react';

export default function useFormAndValidation(initialValues = null) {
    const [values, setValues] = useState(initialValues ?? {});
    const [errors, setErrors] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
    }

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    })

    return { handleChange, resetForm, values, errors, isValid, setValues, setErrors, setIsValid }
}