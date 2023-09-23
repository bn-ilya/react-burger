import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ComponentProps, FC } from 'react';

import { TBuregerSpinLoader } from './burger-spin-loader-props';

import styles from './burger-spin-loader.module.css';

const BurgerSpinLoader: FC<TBuregerSpinLoader> = ({ type }) => {
  return (
    <div className={styles.loader}>
      <BurgerIcon type={type} />
    </div>
  );
};

export default BurgerSpinLoader;
