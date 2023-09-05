import { selectUserDataFetch } from "../../../../services/selectors";
import { useSelector } from "react-redux";
import styles from './profile-form.module.css';
import Inputs from "./inputs/inputs";

export default function ProfileForm() {

    const { request, failed } = useSelector(selectUserDataFetch);

    const Content = function() {
        if (request) {
            return <div>Загрузка...</div>
        } else if (failed) {
            return <div>Ошибка...</div>
        } else {
            return <Inputs/> 
        }
    }

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Content/>
        </form>
    )
}