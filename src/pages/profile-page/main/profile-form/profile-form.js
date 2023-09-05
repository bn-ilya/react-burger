import { selectUserDataFetch } from "../../../../services/selectors";
import { useSelector } from "react-redux";
import styles from './profile-form.module.css';
import Inputs from "./inputs/inputs";
import { useState, useEffect } from "react"
import { selectUserData } from "../../../../services/selectors";

export default function ProfileForm() {
    const { request, failed } = useSelector(selectUserDataFetch);
    const { name, email } = useSelector(selectUserData);
    const password = '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        setFormData({ ...formData, name: name, email: email })
    }, [name, email])

    useEffect(() => {
        if (
            name !== formData.name ||
            email !== formData.email ||
            password !== formData.password
        ) {
            setShowControls(true)
        } else {
            setShowControls(false)
        }
    }, [formData])

    const Content = function () {
        if (request) {
            return <div>Загрузка...</div>
        } else if (failed) {
            return <div>Ошибка...</div>
        } else {
            return (
                <>
                    <Inputs formData={formData} setFormData={setFormData} />
                    {showControls && <button>Сохранить</button>}
                </>
            )
        }
    }

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Content />

        </form>
    )
}