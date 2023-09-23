import { useMemo, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './profile-menu.module.css';

import { useAppDispatch } from '../../../../hooks/rtk-hooks';
import { openModal } from '../../../../services/reducers/modal';

import { logout } from '../../../../services/reducers/profile';
import { IError } from '../../../../utils/types';

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classActive = useMemo(() => styles.linkActive + ' text text_type_main-medium', []);
  const classInActive = useMemo(
    () => styles.linkInActive + ' text text_type_main-medium text_color_inactive',
    [],
  );

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      const errorObject = error as IError;
      openModal({ content: errorObject.message, type: 'error' });
    }
  };

  return (
    <div>
      <ul className={styles.list}>
        <NavLink
          to='/profile'
          end
          className={({ isActive }) => (isActive ? classActive : classInActive)}
        >
          Профиль
        </NavLink>
        <NavLink
          to='/profile/orders'
          end
          className={({ isActive }) => (isActive ? classActive : classInActive)}
        >
          История заказов
        </NavLink>
        <button onClick={handleLogout} className={classInActive}>
          Выход
        </button>
      </ul>
      <span className={'text text_type_main-default ' + styles.description}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </div>
  );
};

export default ProfileMenu;
