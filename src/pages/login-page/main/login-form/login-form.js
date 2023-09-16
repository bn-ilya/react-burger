import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

import styles from './login-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { login } from '../../../../services/reducers/profile';
import { selectUserDataRequest } from '../../../../services/selectors';

export default function LoginForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDataRequest = useSelector(selectUserDataRequest);
  const { values, errors, isValid, handleChange } = useFormAndValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(values)).unwrap();
      location?.state?.goBack
        ? navigate(location.state.goBack.pathname, { replace: true })
        : navigate('/', { replace: true });
    } catch (error) {
      dispatch(openModal({ content: error.message, type: 'error' }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
      <EmailInput
        placeholder={'E-mail'}
        onChange={handleChange}
        name={'email'}
        value={values.email ?? ''}
        error={!!errors.email}
        errorText={errors.email}
        size={'default'}
        required={true}
      />
      <PasswordInput
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'ShowIcon'}
        name={'password'}
        value={values.password ?? ''}
        error={!!errors.password}
        errorText={errors.password}
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
}
