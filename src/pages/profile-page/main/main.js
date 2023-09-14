import styles from './main.module.css';
import ProfileForm from './profile-form/profile-form';
import ProfileMenu from './profile-menu/profile-menu';

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <ProfileMenu />
        <ProfileForm />
      </div>
    </div>
  );
}
