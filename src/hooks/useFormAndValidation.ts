import { ChangeEvent, useCallback, useState } from 'react';

import { IErrorsForm } from '../utils/types';

const useFormAndValidation = <T>(initialValues?: T) => {
  const [values, setValues] = useState<T | null>(initialValues || null);
  const [errors, setErrors] = useState<IErrorsForm>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value as keyof T } as T);
      setErrors({ ...errors, [name]: e.target.validationMessage });
      setIsValid(e.target.closest('form')?.checkValidity() ?? false);
    }
  };

  const resetForm = useCallback(
    (newValues: T | null = null, newErrors: IErrorsForm = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [],
  );

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
