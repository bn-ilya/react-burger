import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './reset-password-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { resetPassword } from '../../../../services/reducers/reset-password';
import { selectResetPasswordRequest } from '../../../../services/selectors';
import { ETypesModal, IError, TPasswordUser } from '../../../../utils/types';

const ResetPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resetPasswordRequest = useSelector(selectResetPasswordRequest);
  const { values, errors, isValid, handleChange } = useFormAndValidation<{
    password: TPasswordUser;
    token: string;
  }>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values) {
        await dispatch(resetPassword(values)).unwrap();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ contentModal: errorObject.message, typeModal: ETypesModal.ERROR }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
      <PasswordInput
        placeholder={'Введите новый пароль'}
        value={values?.password ?? ''}
        onChange={handleChange}
        name={'password'}
        icon={'ShowIcon'}
        size={'default'}
        required={true}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        value={values?.token ?? ''}
        onChange={handleChange}
        name={'token'}
        error={!!errors.token}
        errorText={errors.token}
        size={'default'}
        required={true}
      />
      <ButtonLoader
        disabled={!isValid}
        load={resetPasswordRequest}
        loop={true}
        htmlType='submit'
        type='primary'
        size='medium'
      >
        Сохранить
      </ButtonLoader>
    </form>
  );
};

export default ResetPasswordForm;
