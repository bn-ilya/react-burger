import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Controls from './controls/controls';
import Inputs from './inputs/inputs';
import styles from './profile-form.module.css';
import SceletonLoader from './sceleton-loader/sceleton-loader';

import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { updateUserData } from '../../../../services/reducers/profile';
import {
  selectUserData,
  selectUserDataFetch,
} from '../../../../services/selectors';

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { request, failed } = useSelector(selectUserDataFetch);
  const { name, email } = useSelector(selectUserData);
  const password = '';

  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({
      name: name,
      email: email,
      password: '',
    });

  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (request) return;
    if (
      name !== values.name ||
      email !== values.email ||
      password !== values.password
    ) {
      setShowControls(true);
    } else {
      showControls && setShowControls(false);
    }
  }, [values, name, email, password, showControls, request]);

  const save = async () => {
    try {
      await dispatch(updateUserData(values)).unwrap();
    } catch (error) {
      dispatch(openModal({ content: error.message, type: 'error' }));
    }
  };

  const cancel = useCallback(() => {
    resetForm({ name, email, password });
  }, [name, email, password, resetForm]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    save();
  };

  if (request) return <SceletonLoader />;
  if (failed) dispatch(openModal({ content: '', type: 'error' }));

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
      <Inputs
        values={values}
        errors={errors}
        isValid={isValid}
        handleChange={handleChange}
      />
      {showControls && <Controls isValid={isValid} cancel={cancel} />}
    </form>
  );
}
