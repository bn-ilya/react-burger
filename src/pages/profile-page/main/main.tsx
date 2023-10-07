import { Route, Routes } from 'react-router-dom';

import styles from './main.module.css';
import ProfileForm from './profile-form/profile-form';
import ProfileMenu from './profile-menu/profile-menu';

import { ERoutes } from '../../../utils/types';

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <ProfileMenu />
        <Routes>
          <Route path={'/'} element={<ProfileForm />} />
          <Route path={ERoutes.profileOrders} element={<ProfileForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
