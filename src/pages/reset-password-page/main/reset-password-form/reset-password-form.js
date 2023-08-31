import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-form.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../services/reducers/modal";
import { useState } from 'react';

export default function ResetPasswordForm() {
    const [formData, setFormData] = useState({
        password: '',
        token: ''
    })

    const handleInputs = e => {
        const [value, field] = [e.target.value, e.target.name];
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
<form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Регистрация</h1>
            <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={handleInputs}
                name={'password'}
                icon={'ShowIcon'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={handleInputs}
                name={'token'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="button" type="primary" size="medium">
                Зарегистрироваться
            </Button>
        </form>
    )
}