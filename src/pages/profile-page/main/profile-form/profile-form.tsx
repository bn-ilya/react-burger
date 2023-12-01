import { useState, useEffect, useCallback, FC, FormEvent } from 'react';

import Controls from './controls/controls';
import Inputs from './inputs/inputs';
import styles from './profile-form.module.css';
import SceletonLoader from './sceleton-loader/sceleton-loader';

import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import useFormAndValidation from '../../../../hooks/useFormAndValidation';
import { openModal } from '../../../../services/reducers/modal/modal';
import { updateUserData } from '../../../../services/reducers/profile/profile';
import { selectUserData, selectUserDataFetch } from '../../../../services/selectors';
import { ETypesModal, IError, TPasswordUser } from '../../../../utils/types';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const { request, failed } = useAppSelector(selectUserDataFetch);
  const { name, email } = useAppSelector(selectUserData);
  const password: TPasswordUser = '';

  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({
    name: name,
    email: email,
    password: '',
  });

  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (request) return;
    if (!values) return;
    if (name !== values.name || email !== values.email || password !== values.password) {
      setShowControls(true);
    } else {
      showControls && setShowControls(false);
    }
  }, [values, name, email, password, showControls, request]);

  const save = async () => {
    try {
      if (values) {
        await dispatch(updateUserData(values)).unwrap();
      }
    } catch (error) {
      const errorObject = error as IError;
      dispatch(openModal({ contentModal: errorObject.message, typeModal: ETypesModal.ERROR }));
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
  if (failed) dispatch(openModal({ contentModal: '', typeModal: ETypesModal.ERROR }));

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
      <Inputs values={values} errors={errors} isValid={isValid} handleChange={handleChange} />
      {showControls && <Controls isValid={isValid} cancel={cancel} />}
    </form>
  );
};

export default ProfileForm;
