import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './forgot-password-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { forgotPassword } from '../../../../services/reducers/forgot-password';
import { openModal } from '../../../../services/reducers/modal';
import { selectForgotPasswordRequest } from '../../../../services/selectors';

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useFormAndValidation();
  const forgotPasswordRequest = useSelector(selectForgotPasswordRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(forgotPassword(values.email)).unwrap();
      navigate('/reset-password', { replace: true });
    } catch (error) {
      dispatch(openModal({ content: error.message, type: 'error' }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium ' + styles.title}>
        Восстановление пароля
      </h1>
      <EmailInput
        placeholder={'E-mail'}
        value={values.email ?? ''}
        name='email'
        onChange={handleChange}
        error={!!errors.email}
        errorText={errors.email}
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
}
