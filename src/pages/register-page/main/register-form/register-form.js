import { useState } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import styles from './register-form.module.css';
import { register } from "../../../../services/reducers/profile";
import { openModal } from "../../../../services/reducers/modal";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputs = e => {
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await dispatch(register(formData)).unwrap();
            if (res.success) navigate('/profile', {replace: true})
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Регистрация</h1>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleInputs}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={handleInputs}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={handleInputs}
                icon={'ShowIcon'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="submit" type="primary" size="medium">
                Зарегистрироваться
            </Button>
        </form>
    )
}