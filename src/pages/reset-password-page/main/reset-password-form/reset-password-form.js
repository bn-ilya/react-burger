import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-form.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../services/reducers/modal";
import { useState } from 'react';
import {resetPassword} from "../../../../services/reducers/reset-password";

export default function ResetPasswordForm() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        password: '',
        token: ''
    })

    const handleInputs = e => {
        const [value, field] = [e.target.value, e.target.name];
        setFormData({ ...formData, [field]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(formData))
        .unwrap() 
        .catch(error => {
            dispatch(openModal({ content: error.message, type: 'error' }))
        })   
        // .then()
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                value={formData.password}
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
                value={formData.token}
                onChange={handleInputs}
                name={'token'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="submit" type="primary" size="medium">
                Сохранить
            </Button>
        </form>
    )
}