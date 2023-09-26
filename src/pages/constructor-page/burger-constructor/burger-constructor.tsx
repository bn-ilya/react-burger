import { FC } from 'react';

import styles from './burger-constructor.module.css';
import Constructor from './constructor/constructor';
import Info from './info/info';

const BurgerConstructor: FC = () => {
  return (
    <section className={styles.content}>
      <div className={styles.main}>
        <Constructor />
      </div>
      <div className={styles.footer}>
        <Info />
      </div>
    </section>
  );
};

export default BurgerConstructor;
