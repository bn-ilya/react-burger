import styles from './main.module.css';
import ProfileForm from './profile-form/profile-form';
import ProfileMenu from './profile-menu/profile-menu';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../../services/reducers/profile';
import { useEffect } from 'react';

export default function Main() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserData());
    }, []);
    
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <ProfileMenu />
                <ProfileForm />
            </div>
        </div>
    )
}