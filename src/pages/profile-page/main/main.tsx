import styles from './main.module.css';
import ProfileForm from './profile-form/profile-form';
import ProfileMenu from './profile-menu/profile-menu';

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <ProfileMenu />
        <ProfileForm />
      </div>
    </div>
  );
};

export default Main;
