import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC, memo } from 'react';

import styles from './controls.module.css';

import ButtonLoader from '../../../../../components/button-loader/button-loader';
import { useAppSelector } from '../../../../../hooks/rtk-hooks';
import { selectUpdateUserDataRequest } from '../../../../../services/selectors';

interface ControlsProps {
  isValid: boolean;
  cancel: () => void;
}

const Controls: FC<ControlsProps> = memo(function Controls({ isValid, cancel }) {
  const updateUserDataRequest = useAppSelector(selectUpdateUserDataRequest);

  return (
    <div className={styles.content}>
      <Button htmlType='button' type='secondary' size='medium' onClick={() => cancel()}>
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
