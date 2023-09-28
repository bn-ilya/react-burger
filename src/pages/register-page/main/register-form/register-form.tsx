import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './register-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { register } from '../../../../services/reducers/profile';
import { selectUserDataRequest } from '../../../../services/selectors';
import { ETypesModal, IError } from '../../../../utils/types';

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useFormAndValidation();
  const userDataRequest = useAppSelector(selectUserDataRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(register(values)).unwrap();
      navigate('/profile', { replace: true });
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ contentModal: errorObject.message, typeModal: ETypesModal.ERROR }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium ' + styles.title}>Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        name={'name'}
        value={values.name ?? ''}
        error={!!errors.name}
        errorText={errors.name}
        size={'default'}
        required={true}
      />
      <EmailInput
        placeholder={'E-mail'}
        onChange={handleChange}
        name={'email'}
        value={values.email ?? ''}
        size={'default'}
        required={true}
      />
      <PasswordInput
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'ShowIcon'}
        name={'password'}
        value={values.password ?? ''}
        required={true}
      />
      <ButtonLoader
        disabled={!isValid}
        load={userDataRequest}
        loop={true}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Зарегистрироваться
      </ButtonLoader>
    </form>
  );
};

export default RegisterForm;
