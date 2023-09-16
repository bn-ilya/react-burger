import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './register-form.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { register } from '../../../../services/reducers/profile';
import { selectUserDataRequest } from '../../../../services/selectors';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useFormAndValidation();
  const userDataRequest = useSelector(selectUserDataRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(values)).unwrap();
      navigate('/profile', { replace: true });
    } catch (error) {
      dispatch(openModal({ content: error.message, type: 'error' }));
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
        Зарегистрироваться
      </ButtonLoader>
    </form>
  );
}
