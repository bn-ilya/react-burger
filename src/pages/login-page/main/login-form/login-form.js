import { useState } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
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
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
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
            <Button htmlType="button" type="primary" size="medium">
                Войти
            </Button>
        </form>
    )
}