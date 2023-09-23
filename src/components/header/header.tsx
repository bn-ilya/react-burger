import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import styles from './header.module.css';
import Link from './link/link';

const Header: FC = () => {
  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.navigationList}>
            <li>
              <Link iconCb={(type) => <BurgerIcon type={type} />} label={'Конструктор'} to={'/'}>
                Конструктор
              </Link>
            </li>
            <li>
              <Link
                iconCb={(type) => <ListIcon type={type} />}
                label={'Лента заказов'}
                to={'/undefined'}
              >
                Лента заказов
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.profile}>
          <Link
            iconCb={(type) => <ProfileIcon type={type} />}
            label={'Личный кабинет'}
            to={'/profile'}
          >
            Личный кабинет
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
