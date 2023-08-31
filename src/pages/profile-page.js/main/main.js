import styles from './main.module.css';
import ProfileForm from './profile-form/profile-form';

export default function Main() {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div>1</div>
                <ProfileForm/>
                <div>3</div>
            </div>
        </div>
    )
}