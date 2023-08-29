import { useState } from "react"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';

export default function LoginForm() {
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
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={handleInputs}
                icon={'CurrencyIcon'}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={handleInputs}
                icon={'CurrencyIcon'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            {formData.email}
            {formData.password}
        </form>
    )
}