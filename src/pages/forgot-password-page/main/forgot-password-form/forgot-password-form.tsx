import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './forgot-password-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/useFormAndValidation';
import { forgotPassword } from '../../../../services/reducers/forgot-password/forgot-password';
import { openModal } from '../../../../services/reducers/modal/modal';
import { selectForgotPasswordRequest } from '../../../../services/selectors';
import { ETypesModal, IError, TEmailUser } from '../../../../utils/types';

const ForgotPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, isValid, handleChange } = useFormAndValidation<{ email: TEmailUser }>();
  const forgotPasswordRequest = useAppSelector(selectForgotPasswordRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (values) {
        await dispatch(forgotPassword(values.email)).unwrap();
        navigate('/reset-password', { replace: true });
      }
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ contentModal: errorObject.message, typeModal: ETypesModal.ERROR }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
      <EmailInput
        placeholder={'E-mail'}
        value={values?.email ?? ''}
        name='email'
        onChange={handleChange}
        size={'default'}
        required={true}
      />
      <ButtonLoader
        disabled={!isValid}
        load={forgotPasswordRequest}
        loop={true}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Восстановить
      </ButtonLoader>
    </form>
  );
};

export default ForgotPasswordForm;
