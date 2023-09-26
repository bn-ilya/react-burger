import { ChangeEvent, useCallback, useState } from 'react';

import { IErrorsForm, IValuesForm } from '../utils/types';

const useFormAndValidation = (initialValues: IValuesForm = {}) => {
  const [values, setValues] = useState<IValuesForm>(initialValues ?? {});
  const [errors, setErrors] = useState<IErrorsForm>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
