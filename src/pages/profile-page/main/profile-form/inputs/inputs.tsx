import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC } from 'react';

import { IInputsProps } from './inputs-props';

import InputEdit from '../../../../../components/input-edit/input-edit';

const Inputs: FC<IInputsProps> = ({ values, errors, handleChange }) => {
  return (
    <>
      <InputEdit
        placeholder={'Имя'}
        onChange={handleChange}
        name={'name'}
        value={values?.name ?? ''}
        error={!!errors.name}
        errorText={errors.name}
        icon={'EditIcon'}
        size={'default'}
      />
      <EmailInput
        placeholder={'Логин'}
        onChange={handleChange}
        name={'email'}
        value={values?.email ?? ''}
        isIcon={true}
        size={'default'}
      />
      <PasswordInput
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'EditIcon'}
        name={'password'}
        value={values?.password ?? ''}
        size={'default'}
      />
    </>
  );
};

export default Inputs;
