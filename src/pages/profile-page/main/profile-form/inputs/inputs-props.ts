import { ChangeEvent } from 'react';

import { IErrorsForm, IValuesForm } from '../../../../../utils/types';

export interface IInputsProps {
  values: IValuesForm;
  errors: IErrorsForm;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
