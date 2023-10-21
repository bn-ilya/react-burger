import { ChangeEvent } from 'react';

import { IErrorsForm, TEmailUser, TNameUser, TPasswordUser } from '../../../../../utils/types';

export interface IInputsProps {
  values: { name: TNameUser; email: TEmailUser; password: TPasswordUser } | null;
  errors: IErrorsForm;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
