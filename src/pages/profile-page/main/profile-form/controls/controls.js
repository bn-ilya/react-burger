import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { PropTypes } from 'prop-types';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import styles from './controls.module.css';

import ButtonLoader from '../../../../../components/button-loader/button-loader';
import { selectUpdateUserDataRequest } from '../../../../../services/selectors';

const Controls = memo(function Controls({ isValid, cancel }) {
  const updateUserDataRequest = useSelector(selectUpdateUserDataRequest);

  return (
    <div className={styles.content}>
      <Button
        htmlType='button'
        type='secondary'
        size='medium'
        onClick={() => cancel()}
      >
        Отмена
      </Button>
      <ButtonLoader
        disabled={!isValid}
        load={updateUserDataRequest}
        loop={true}
        htmlType='submit'
        type='primary'
        size='large'
      >
        Сохранить
      </ButtonLoader>
    </div>
  );
});

export default Controls;

Controls.propTypes = {
  isValid: PropTypes.bool.isRequired,
  cancel: PropTypes.func,
};
