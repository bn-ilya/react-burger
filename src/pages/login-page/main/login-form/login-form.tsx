import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './login-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { login } from '../../../../services/reducers/profile';
import { selectUserDataRequest } from '../../../../services/selectors';
import { IError } from '../../../../utils/types';

const LoginForm = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDataRequest = useAppSelector(selectUserDataRequest);
  const { values, isValid, handleChange } = useFormAndValidation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(values)).unwrap();
      location?.state?.goBack
        ? navigate(location.state.goBack.pathname, { replace: true })
        : navigate('/', { replace: true });
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ content: errorObject.message, type: 'error' }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
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
        size={'default'}
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
        Войти
      </ButtonLoader>
    </form>
  );
};

export default LoginForm;
