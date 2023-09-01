import { useState } from "react"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-form.module.css';

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputs = e => {
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleInputs}
                name={'email'}
                error={false}
                icon={'EditIcon'}
                errorText={'Ошибка'}
                size={'default'}
                disabled={true}
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={handleInputs}
                icon={'EditIcon'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                disabled={true}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={handleInputs}
                icon={'EditIcon'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                disabled={true}
            />
        </form>
    )
}