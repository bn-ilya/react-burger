import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './login-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/useFormAndValidation';
import { openModal } from '../../../../services/reducers/modal/modal';
import { login } from '../../../../services/reducers/profile/profile';
import { selectUserDataRequest } from '../../../../services/selectors';
import { ETypesModal, IError, TEmailUser, TPasswordUser } from '../../../../utils/types';

const LoginForm = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDataRequest = useAppSelector(selectUserDataRequest);
  const { values, isValid, handleChange } = useFormAndValidation<{
    email: TEmailUser;
    password: TPasswordUser;
  }>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values) {
        await dispatch(login(values)).unwrap();
        location?.state?.goBack
          ? navigate(location.state.goBack.pathname, { replace: true })
          : navigate('/', { replace: true });
      }
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ contentModal: errorObject.message, typeModal: ETypesModal.ERROR }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
      <EmailInput
        placeholder={'E-mail'}
        onChange={handleChange}
        name={'email'}
        value={values?.email ?? ''}
        size={'default'}
        required={true}
        data-cy={'input-login'}
      />
      <PasswordInput
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'ShowIcon'}
        name={'password'}
        value={values?.password ?? ''}
        size={'default'}
        required={true}
        data-cy={'password-login'}
      />
      <ButtonLoader
        disabled={!isValid}
        load={userDataRequest}
        loop={true}
        htmlType='submit'
        type='primary'
        size='medium'
        data-cy={'btn-login'}
      >
        Войти
      </ButtonLoader>
    </form>
  );
};

export default LoginForm;
