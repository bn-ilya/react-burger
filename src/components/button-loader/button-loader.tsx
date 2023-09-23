import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC } from 'react';

import { IButtonLoader } from './button-loader-props';
import styles from './button-loader.module.css';

import BurgerSpinLoader from '../ui/loaders/burger-spin-loader';

const ButtonLoader: FC<IButtonLoader> = ({ load, children, disabled = false, ...props }) => {
  return (
    <Button disabled={load || disabled} extraClass={styles.loaderBtn} {...props}>
      {load && <BurgerSpinLoader type='secondary' />}
      {children}
    </Button>
  );
};

export default ButtonLoader;
