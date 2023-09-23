import { useState, useEffect, useCallback, FC, FormEvent } from 'react';

import Controls from './controls/controls';
import Inputs from './inputs/inputs';
import styles from './profile-form.module.css';
import SceletonLoader from './sceleton-loader/sceleton-loader';

import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/use-form-and-validation';
import { openModal } from '../../../../services/reducers/modal';
import { updateUserData } from '../../../../services/reducers/profile';
import { selectUserData, selectUserDataFetch } from '../../../../services/selectors';
import { IError } from '../../../../utils/types';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const { request, failed } = useAppSelector(selectUserDataFetch);
  const { name, email } = useAppSelector(selectUserData);
  const password: string | number = '';

  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({
    name: name,
    email: email,
    password: '',
  });

  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (request) return;
    if (name !== values.name || email !== values.email) {
      setShowControls(true);
    } else {
      showControls && setShowControls(false);
    }
  }, [values, name, email, showControls, request]);

  const save = async () => {
    try {
      await dispatch(updateUserData(values)).unwrap();
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ content: errorObject.message, type: 'error' }));
    }
  };

  const cancel = useCallback(() => {
    resetForm({ name, email, password });
  }, [name, email, password, resetForm]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    save();
  };

  if (request) return <SceletonLoader />;
  if (failed) dispatch(openModal({ content: '', type: 'error' }));

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
      <Inputs values={values} errors={errors} isValid={isValid} handleChange={handleChange} />
      {showControls && <Controls isValid={isValid} cancel={cancel} />}
    </form>
  );
};

export default ProfileForm;
