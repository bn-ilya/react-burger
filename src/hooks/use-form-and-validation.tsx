import { KeyboardEvent, useCallback, useState } from 'react';

interface IValues {
  [key: string]: string | number;
}
interface IErrors {
  [key: string]: string;
}

const useFormAndValidation = (initialValues: IValues = {}) => {
  const [values, setValues] = useState<IValues>(initialValues ?? {});
  const [errors, setErrors] = useState<IErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: e.target.validationMessage });
      setIsValid(e.target.closest('form')?.checkValidity() ?? false);
    }
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return {
    handleChange,
    resetForm,
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
  };
};

export default useFormAndValidation;
