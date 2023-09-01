import { NavLink } from "react-router-dom";
import styles from './profile-menu.module.css';
import {useMemo} from 'react'

export default function ProfileMenu() {

    const classActive = useMemo(() => styles.linkActive + " text text_type_main-medium", [])
    const classInActive = useMemo(() => styles.linkInActive + " text text_type_main-medium text_color_inactive", [])

    return (
        <div>
            <ul className={styles.list}>
                <NavLink to="/profile" className={({isActive}) => isActive ? classActive : classInActive}>Профиль</NavLink>
                <NavLink to="/profile/orders/id" className={({isActive}) => isActive ? classActive : classInActive}>История заказов</NavLink>
                <NavLink to="/profile/orders" className={({isActive}) => isActive ? classActive : classInActive}>Выход</NavLink>
            </ul>
            <span className={"text text_type_main-default " + styles.description}>
                В этом разделе вы можете
                изменить свои персональные данные
            </span>
        </div>
    )
}